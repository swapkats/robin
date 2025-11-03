// Basic User/Content Schema Template
// Single-table design for applications with users, posts, comments, and likes

import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BaseEntity {
  PK: string;
  SK: string;
  EntityType: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface User extends BaseEntity {
  EntityType: 'User';
  UserId: string;
  Email: string;
  Name: string;
  GSI1PK: string; // USER#<email>
  GSI1SK: string; // USER#<email>
}

export interface Post extends BaseEntity {
  EntityType: 'Post';
  PostId: string;
  UserId: string;
  Title: string;
  Content: string;
  GSI1PK: string; // POST#<postId>
  GSI1SK: string; // POST#<postId>
  GSI2PK: string; // ALL_POSTS
  GSI2SK: string; // POST#<timestamp>
}

export interface Comment extends BaseEntity {
  EntityType: 'Comment';
  CommentId: string;
  PostId: string;
  UserId: string;
  Content: string;
  GSI1PK: string; // POST#<postId>
  GSI1SK: string; // COMMENT#<timestamp>#<commentId>
}

export interface Like extends BaseEntity {
  EntityType: 'Like';
  PostId: string;
  UserId: string;
  GSI1PK: string; // POST#<postId>
  GSI1SK: string; // LIKE#USER#<userId>
}

export type Entity = User | Post | Comment | Like;

// ============================================================================
// KEY PATTERNS
// ============================================================================

export const Keys = {
  user: (userId: string) => ({
    PK: `USER#${userId}`,
    SK: 'PROFILE',
  }),

  userByEmail: (email: string) => ({
    GSI1PK: `USER#${email}`,
    GSI1SK: `USER#${email}`,
  }),

  post: (userId: string, timestamp: number, postId: string) => ({
    PK: `USER#${userId}`,
    SK: `POST#${timestamp}#${postId}`,
  }),

  postById: (postId: string) => ({
    GSI1PK: `POST#${postId}`,
    GSI1SK: `POST#${postId}`,
  }),

  allPosts: (timestamp: number) => ({
    GSI2PK: 'ALL_POSTS',
    GSI2SK: `POST#${timestamp}`,
  }),

  comment: (postId: string, timestamp: number, commentId: string) => ({
    PK: `POST#${postId}`,
    SK: `COMMENT#${timestamp}#${commentId}`,
  }),

  commentsByPost: (postId: string) => ({
    GSI1PK: `POST#${postId}`,
  }),

  like: (userId: string, postId: string) => ({
    PK: `USER#${userId}`,
    SK: `LIKE#POST#${postId}`,
  }),

  likesByPost: (postId: string) => ({
    GSI1PK: `POST#${postId}`,
  }),
};

// ============================================================================
// ACCESS PATTERNS
// ============================================================================

export class UserContentRepository {
  constructor(
    private docClient: DynamoDBDocumentClient,
    private tableName: string
  ) {}

  // USER OPERATIONS
  async createUser(data: {
    userId: string;
    email: string;
    name: string;
  }): Promise<User> {
    const now = new Date().toISOString();
    const user: User = {
      ...Keys.user(data.userId),
      ...Keys.userByEmail(data.email),
      EntityType: 'User',
      UserId: data.userId,
      Email: data.email,
      Name: data.name,
      CreatedAt: now,
      UpdatedAt: now,
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: user,
      })
    );

    return user;
  }

  async getUserById(userId: string): Promise<User | null> {
    const { Item } = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: Keys.user(userId),
      })
    );

    return (Item as User) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${email}`,
        },
        Limit: 1,
      })
    );

    return (Items?.[0] as User) || null;
  }

  // POST OPERATIONS
  async createPost(data: {
    postId: string;
    userId: string;
    title: string;
    content: string;
  }): Promise<Post> {
    const now = new Date().toISOString();
    const timestamp = Date.now();
    const post: Post = {
      ...Keys.post(data.userId, timestamp, data.postId),
      ...Keys.postById(data.postId),
      ...Keys.allPosts(timestamp),
      EntityType: 'Post',
      PostId: data.postId,
      UserId: data.userId,
      Title: data.title,
      Content: data.content,
      CreatedAt: now,
      UpdatedAt: now,
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: post,
      })
    );

    return post;
  }

  async getPostById(postId: string): Promise<Post | null> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `POST#${postId}`,
        },
        Limit: 1,
      })
    );

    return (Items?.[0] as Post) || null;
  }

  async getPostsByUser(userId: string, limit = 20): Promise<Post[]> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
          ':sk': 'POST#',
        },
        ScanIndexForward: false, // Newest first
        Limit: limit,
      })
    );

    return (Items as Post[]) || [];
  }

  async getAllPosts(limit = 20): Promise<Post[]> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'GSI2',
        KeyConditionExpression: 'GSI2PK = :pk',
        ExpressionAttributeValues: {
          ':pk': 'ALL_POSTS',
        },
        ScanIndexForward: false, // Newest first
        Limit: limit,
      })
    );

    return (Items as Post[]) || [];
  }

  // COMMENT OPERATIONS
  async createComment(data: {
    commentId: string;
    postId: string;
    userId: string;
    content: string;
  }): Promise<Comment> {
    const now = new Date().toISOString();
    const timestamp = Date.now();
    const comment: Comment = {
      ...Keys.comment(data.postId, timestamp, data.commentId),
      GSI1PK: `POST#${data.postId}`,
      GSI1SK: `COMMENT#${timestamp}#${data.commentId}`,
      EntityType: 'Comment',
      CommentId: data.commentId,
      PostId: data.postId,
      UserId: data.userId,
      Content: data.content,
      CreatedAt: now,
      UpdatedAt: now,
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: comment,
      })
    );

    return comment;
  }

  async getCommentsByPost(postId: string, limit = 50): Promise<Comment[]> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk AND begins_with(GSI1SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': `POST#${postId}`,
          ':sk': 'COMMENT#',
        },
        ScanIndexForward: true, // Oldest first
        Limit: limit,
      })
    );

    return (Items as Comment[]) || [];
  }

  // LIKE OPERATIONS
  async likePost(userId: string, postId: string): Promise<Like> {
    const now = new Date().toISOString();
    const like: Like = {
      ...Keys.like(userId, postId),
      GSI1PK: `POST#${postId}`,
      GSI1SK: `LIKE#USER#${userId}`,
      EntityType: 'Like',
      PostId: postId,
      UserId: userId,
      CreatedAt: now,
      UpdatedAt: now,
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: like,
      })
    );

    return like;
  }

  async hasUserLikedPost(userId: string, postId: string): Promise<boolean> {
    const { Item } = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: Keys.like(userId, postId),
      })
    );

    return !!Item;
  }

  async getLikesByPost(postId: string): Promise<Like[]> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk AND begins_with(GSI1SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': `POST#${postId}`,
          ':sk': 'LIKE#USER#',
        },
      })
    );

    return (Items as Like[]) || [];
  }

  async getPostsLikedByUser(userId: string): Promise<Like[]> {
    const { Items } = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
          ':sk': 'LIKE#POST#',
        },
      })
    );

    return (Items as Like[]) || [];
  }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDB({}));
const repo = new UserContentRepository(client, 'my-app-table');

// Create user
const user = await repo.createUser({
  userId: 'user-123',
  email: 'user@example.com',
  name: 'John Doe',
});

// Create post
const post = await repo.createPost({
  postId: 'post-456',
  userId: user.UserId,
  title: 'My First Post',
  content: 'Hello, world!',
});

// Get user's posts
const posts = await repo.getPostsByUser(user.UserId);

// Create comment
const comment = await repo.createComment({
  commentId: 'comment-789',
  postId: post.PostId,
  userId: user.UserId,
  content: 'Great post!',
});

// Like a post
await repo.likePost(user.UserId, post.PostId);

// Check if user liked post
const hasLiked = await repo.hasUserLikedPost(user.UserId, post.PostId);
*/
