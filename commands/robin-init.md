---
description: Initialize a new Next.js + DynamoDB project with Robin's opinionated stack
---

# Robin Project Initialization

Initialize a complete, production-ready Next.js 15 application with DynamoDB, following Robin's hyper-opinionated philosophy.

## What This Command Does

Creates a fully-configured Next.js application with:
- **Next.js 15** App Router (strict, no Pages Router)
- **TypeScript** strict mode configured
- **Tailwind CSS** pre-configured
- **DynamoDB** single-table schema starter
- **NextAuth.js v5** authentication setup
- **Testing** infrastructure (Vitest + Playwright)
- **SST** deployment configuration
- **ESLint + Prettier** enforced code style
- All Robin standards and best practices

## Interactive Setup

Ask the user for these details:

1. **Project Name**
   - Validate: lowercase, alphanumeric with hyphens
   - Example: `my-saas-app`

2. **Deployment Target**
   - Options: `aws` (SST) or `vercel`
   - Default: `aws`

3. **Include Authentication?**
   - Options: `yes` or `no`
   - Default: `yes`
   - If yes: includes NextAuth.js with Google + GitHub OAuth providers

4. **Application Type**
   - Options: `basic` (todo-style app), `saas` (multi-tenant), or `blog` (content platform)
   - Default: `basic`
   - Determines DynamoDB schema template

## Implementation Steps

1. **Create Project Directory**
   ```bash
   mkdir <project-name>
   cd <project-name>
   ```

2. **Copy Template Files**
   - Use `fullstack-package.json` template
   - Copy `tsconfig.json`, `tailwind.config.ts`, `.gitignore`, `.env.example`
   - Adjust project name in package.json

3. **Create Next.js App Structure**
   ```
   app/
   ├── (auth)/
   │   ├── login/page.tsx
   │   └── register/page.tsx
   ├── (dashboard)/
   │   ├── layout.tsx
   │   └── page.tsx
   ├── api/
   │   └── health/route.ts
   ├── actions.ts
   ├── layout.tsx
   └── page.tsx
   ```

4. **Set Up DynamoDB Configuration**
   - Copy appropriate template from `templates/dynamodb/`
   - Create `lib/db/client.ts` with DynamoDB client
   - Create `lib/db/types.ts` with TypeScript types
   - Create `lib/db/repository.ts` with query methods

5. **Configure Authentication** (if selected)
   - Create `lib/auth/config.ts` with NextAuth configuration
   - Create `app/api/auth/[...nextauth]/route.ts`
   - Create `middleware.ts` for route protection
   - Add OAuth provider environment variables to `.env.example`

6. **Set Up SST** (if AWS deployment selected)
   - Create `sst.config.ts`
   - Create `stacks/Database.ts` with DynamoDB table
   - Create `stacks/Web.ts` with Next.js site
   - Add SST scripts to package.json

7. **Create Component Library**
   ```
   components/
   ├── ui/
   │   ├── button.tsx
   │   ├── card.tsx
   │   └── input.tsx
   └── features/
       └── (feature-specific components)
   ```

8. **Set Up Testing**
   - Create `vitest.config.ts`
   - Create `playwright.config.ts`
   - Create `tests/unit/` and `tests/e2e/` directories
   - Add sample tests

9. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Robin-generated Next.js + DynamoDB app"
   ```

10. **Install Dependencies**
    ```bash
    npm install
    ```

11. **Generate README**
    - Project-specific README with:
      - Setup instructions
      - Environment variable configuration
      - Development commands
      - Deployment instructions
      - Architecture overview

## Post-Setup Instructions

After scaffolding, provide the user with:

```markdown
✅ Robin has created your Next.js + DynamoDB application!

## Next Steps

1. Copy `.env.example` to `.env.local` and fill in values:
   ```bash
   cp .env.example .env.local
   ```

2. Configure your AWS credentials (for SST):
   ```bash
   aws configure
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Deploy to AWS:
   ```bash
   npm run deploy
   ```

## What Robin Created

- ✅ Next.js 15 App Router with TypeScript
- ✅ DynamoDB single-table schema
- ✅ NextAuth.js authentication (if selected)
- ✅ Tailwind CSS styling
- ✅ SST deployment config (if selected)
- ✅ Testing infrastructure
- ✅ Production-ready structure

## Robin's Philosophy

This project follows Robin's hyper-opinionated approach:
- Server Components by default
- Single-table DynamoDB design
- Test-driven development
- No technology debates
- Focus on shipping

Start building! Robin has eliminated all the setup decisions for you.
```

## Important Notes

- **No Choices During Setup**: Don't ask about styling libraries, state management, or other tech stack decisions. Robin is opinionated.
- **Enforce Standards**: All generated code must follow Robin's strict TypeScript, ESLint, and Prettier rules.
- **Complete Setup**: Don't generate partial projects. Everything should be ready to run after `npm install`.
- **Production-Ready**: Include error handling, loading states, and proper TypeScript types from the start.

You ship functional, complete applications. Period.
