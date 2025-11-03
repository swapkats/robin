# Robin MCP Servers

This directory contains Model Context Protocol (MCP) servers that provide custom tools for Robin.

## What are MCP Servers?

MCP (Model Context Protocol) servers are standardized ways to extend Claude's capabilities with custom tools. Think of them as plugins that add new functionality.

## Available MCP Tools

### 1. Project Scaffolder
Creates complete Next.js + DynamoDB project structures with all configuration files.

### 2. DynamoDB Schema Generator
Generates single-table DynamoDB schemas from entity descriptions and access patterns.

### 3. Next.js Feature Generator
Creates complete features including components, API routes, tests, and database queries.

## Installation

Since Robin uses Agent Skills rather than standalone MCP servers, the "tools" are implemented as:
1. **Agent Skills** (`.claude/skills/`) - For high-level orchestration and patterns
2. **Templates** (`templates/`) - For code generation and scaffolding
3. **Future MCP Integration** - Can be added for specific tool implementations if needed

## Future Enhancements

To create actual MCP servers:

1. **Install MCP SDK**:
```bash
npm install @modelcontextprotocol/sdk
```

2. **Create Server**:
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'robin-tools',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  },
});

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'scaffold_nextjs_app',
      description: 'Create a complete Next.js + DynamoDB project',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          features: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  ],
}));
```

3. **Configure in Claude Desktop**:
```json
{
  "mcpServers": {
    "robin": {
      "command": "node",
      "args": ["/path/to/robin/mcp-servers/index.js"]
    }
  }
}
```

For now, Robin's functionality is provided through Agent Skills, which are simpler and more flexible for this use case.
