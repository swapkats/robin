# Robin

**A hyper-opinionated Claude agent for building production-ready Next.js apps with DynamoDB.**

Robin eliminates technology debates and focuses entirely on shipping functional, tested, deployed applications. No choices. No bikeshedding. Just production-ready code.

## Philosophy

> **"Functional > Beautiful. Deployed > Perfect. Opinionated > Flexible. Server > Client."**

Robin is designed for developers who want to build and ship fast without arguing about technology choices. It enforces a single, proven tech stack and gets out of your way.

## What Robin Does

- Builds Next.js 15 applications with App Router (never Pages Router)
- Designs DynamoDB single-table schemas (never multiple tables)
- Writes TypeScript with strict mode (never JavaScript)
- Uses Tailwind CSS for styling (no debates)
- Implements Server Components by default (Client only when necessary)
- Writes tests first (TDD mandatory)
- Deploys to AWS or Vercel (infrastructure as code)

## What Robin Does NOT Allow

- Framework debates ("Should I use Next.js or Remix?" → Next.js. Done.)
- Database debates ("SQL vs NoSQL?" → DynamoDB. Done.)
- Styling debates ("CSS-in-JS vs Tailwind?" → Tailwind. Done.)
- Multiple DynamoDB tables (single-table only)
- Pages Router (App Router only)
- Skipping tests
- Client Components by default

## Technology Stack

### Enforced Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: AWS DynamoDB (single-table design)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js v5
- **Validation**: Zod
- **Testing**: Vitest + Playwright
- **Deployment**: AWS (SST) or Vercel

### No Alternatives
There are no alternatives. This is the stack. It's proven, performant, and production-ready.

## Installation

### For Claude Code Users

1. Clone this repository into your projects directory:
```bash
cd /path/to/your/projects
git clone https://github.com/yourusername/robin.git
```

2. Copy the `.claude/skills/` directory to your project:
```bash
cp -r robin/.claude/skills/* your-project/.claude/skills/
```

3. Invoke Robin in Claude Code:
```
Use the robin skill to build my application
```

### Standalone Usage

You can also use Robin's skills directly in any Claude Code project by copying individual skills:

```bash
# Copy specific skills
cp -r robin/.claude/skills/robin your-project/.claude/skills/
cp -r robin/.claude/skills/building-nextjs-apps your-project/.claude/skills/
cp -r robin/.claude/skills/designing-dynamodb-tables your-project/.claude/skills/
cp -r robin/.claude/skills/deploying-to-aws your-project/.claude/skills/
```

## Usage

### Creating a New Application

```
User: Create a new todo application with user authentication

Robin: [Creates complete Next.js + DynamoDB app with:]
- Next.js 15 App Router structure
- DynamoDB single-table schema for users and todos
- NextAuth.js authentication configured
- Todo CRUD operations (Server Actions)
- Tests for all features
- Ready to deploy with SST
```

### Adding Features

```
User: Add the ability for users to share todos with other users

Robin: [Implements sharing feature:]
- Updates DynamoDB schema with sharing relationships
- Adds share endpoint (Server Action)
- Creates shared todos view
- Implements access control
- Adds tests
- Updates documentation
```

### Deploying

```
User: Deploy this to AWS

Robin: [Sets up deployment:]
- Creates SST configuration
- Configures DynamoDB table with CloudFormation
- Sets up proper IAM roles
- Configures environment variables
- Deploys to AWS
- Provides deployment URL
```

## Available Skills

Robin consists of modular Agent Skills that work together:

### 1. robin (Main Orchestrator)
The main skill that coordinates all others. Use this for high-level tasks.

**When to use:** Building complete applications, adding major features

### 2. building-nextjs-apps
Specialized in Next.js 15 App Router patterns, Server Components, and Server Actions.

**When to use:** Implementing Next.js features, components, or routes

### 3. designing-dynamodb-tables
Expert in DynamoDB single-table design, access patterns, and query optimization.

**When to use:** Designing data models, optimizing queries, adding entities

### 4. deploying-to-aws
Handles AWS deployment, SST configuration, and infrastructure as code.

**When to use:** Deploying applications, configuring AWS resources

## Project Structure

When Robin creates a new application, it follows this structure:

```
my-app/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Route group for auth pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/           # Route group for dashboard
│   │   ├── layout.tsx         # Dashboard layout
│   │   └── page.tsx
│   ├── api/                   # API routes
│   ├── actions.ts             # Server Actions
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   └── features/              # Feature-specific components
├── lib/
│   ├── db/                    # DynamoDB client and queries
│   ├── auth/                  # NextAuth configuration
│   └── utils.ts
├── stacks/                    # SST infrastructure
│   ├── Database.ts
│   └── Web.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── .claude/
│   └── skills/                # Robin skills
├── sst.config.ts              # SST configuration
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── .env.example
└── README.md
```

## DynamoDB Schema Patterns

Robin enforces single-table design with these patterns:

### Primary Keys
```
PK: STRING (Partition Key) - Generic name for flexibility
SK: STRING (Sort Key) - Generic name for flexibility
```

### Global Secondary Indexes
```
GSI1: GSI1PK → GSI1SK (Reverse lookups, find by unique attributes)
GSI2: GSI2PK → GSI2SK (Global queries, cross-entity searches)
```

### Example Entity
```typescript
User:
  PK: USER#<userId>
  SK: PROFILE
  GSI1PK: USER#<email>     // Find user by email
  GSI1SK: USER#<email>
  EntityType: User
  Email: user@example.com
  Name: John Doe

Post:
  PK: USER#<userId>
  SK: POST#<timestamp>#<postId>
  GSI1PK: POST#<postId>     // Find post by ID
  GSI1SK: POST#<postId>
  GSI2PK: ALL_POSTS         // Get all posts
  GSI2SK: POST#<timestamp>
  EntityType: Post
  Title: Post title
  Content: Post content
```

## Code Quality Standards

Robin enforces these standards automatically:

### TypeScript
- ✅ Strict mode enabled
- ✅ No `any` types (use `unknown` if needed)
- ✅ Explicit return types on exported functions
- ✅ Zod schemas for runtime validation

### Testing
- ✅ Minimum 80% code coverage
- ✅ Test-driven development (tests before code)
- ✅ Unit tests for business logic
- ✅ E2E tests for critical flows

### Code Style
- ✅ ESLint enforced
- ✅ Prettier auto-formatting
- ✅ Conventional commits
- ✅ No skipped linting rules

## Deployment

### SST (Recommended)

Robin creates SST configuration automatically:

```bash
# Development (creates real AWS resources in dev stage)
npm run dev

# Deploy to production
npm run deploy

# View AWS resources
npm run console
```

### Vercel

For Vercel deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

You'll need to:
1. Create DynamoDB table manually (or use CloudFormation)
2. Create IAM user with DynamoDB access
3. Add credentials to Vercel environment variables

## Examples

### Example 1: Todo Application

```
User: Create a todo application with user authentication

Robin: [Creates:]
- User authentication with NextAuth.js
- Todo CRUD operations
- DynamoDB schema (Users, Todos)
- Server Actions for mutations
- Tests for all features
- SST deployment configuration
```

### Example 2: Blog Platform

```
User: Build a blog platform with posts, comments, and likes

Robin: [Creates:]
- User system with profiles
- Post creation and management
- Comment system
- Like functionality
- DynamoDB single-table design
- Server Components for rendering
- Server Actions for mutations
- Full test coverage
```

### Example 3: SaaS Application

```
User: Create a SaaS app with organizations and teams

Robin: [Creates:]
- Multi-tenant architecture
- Organization management
- Team structure
- Member roles and permissions
- DynamoDB schema with hierarchical data
- NextAuth with organization context
- Admin dashboard
- Billing-ready structure
```

## Templates

Robin includes templates for common scenarios:

### Next.js Templates
- **Base**: Basic Next.js + TypeScript + Tailwind
- **Full-Stack**: + DynamoDB + NextAuth
- **SaaS**: + Multi-tenant + Teams + Billing-ready

### DynamoDB Templates
- **User/Content**: Users, Posts, Comments, Likes
- **SaaS Multi-Tenant**: Organizations, Teams, Members
- **E-commerce**: Products, Orders, Customers

## Best Practices

Robin enforces these practices automatically:

1. **Server Components by default** - Use 'use client' sparingly
2. **Server Actions for mutations** - Forms and programmatic actions
3. **Single-table DynamoDB design** - Always
4. **Query with indexes** - Never scan
5. **Test-driven development** - Tests first, then code
6. **Type-safe everything** - TypeScript strict mode
7. **Validate inputs** - Zod for all user inputs
8. **Environment variables** - Validated with Zod
9. **Infrastructure as code** - SST or CloudFormation
10. **Conventional commits** - Semantic versioning ready

## Success Metrics

Robin considers a task complete when:

1. ✅ All code is written and follows style guidelines
2. ✅ TypeScript compiles with zero errors (strict mode)
3. ✅ All tests pass (80%+ coverage)
4. ✅ ESLint and Prettier report no issues
5. ✅ Application runs locally without errors
6. ✅ Deployment configuration is ready
7. ✅ Documentation is up to date

## Contributing

Robin is open source and contributions are welcome, but remember:

**Robin is opinionated by design.**

Pull requests that add "flexibility" or "alternative options" will likely be rejected. Robin's strength is in its constraints.

Good contributions:
- Bug fixes
- Performance improvements
- Better templates
- Documentation improvements
- Additional skills for the enforced stack

Bad contributions:
- Support for other frameworks
- Configuration options
- "Make it flexible"

## License

MIT

## Credits

Robin is built using:
- [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk) by Anthropic
- [Next.js](https://nextjs.org) by Vercel
- [AWS DynamoDB](https://aws.amazon.com/dynamodb) by Amazon
- [SST](https://sst.dev) by SST
- [NextAuth.js](https://next-auth.js.org)

Inspired by the philosophy that constraints breed creativity and that shipping functional software is better than endless debates.

---

**Ready to build?** Copy Robin's skills to your project and start shipping.

No debates. No discussions. Just production-ready code.
