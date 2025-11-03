# Next.js Templates

These templates provide starting points for Next.js 15 App Router applications with DynamoDB integration.

## Available Templates

### 1. Base Template
- Next.js 15 App Router
- TypeScript (strict mode)
- Tailwind CSS
- ESLint + Prettier
- Basic folder structure

### 2. Full-Stack Template
- Everything from Base
- DynamoDB client setup
- NextAuth.js v5 configured
- Environment variable validation
- Server Actions examples
- API Route examples

### 3. SaaS Template
- Everything from Full-Stack
- Multi-tenant architecture
- User management
- Organization/Team structure
- Subscription/billing ready
- Admin dashboard

## Template Structure

Each template includes:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind configuration
- `next.config.js` - Next.js configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier configuration
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules
- `app/` - Next.js App Router structure
- `components/` - Reusable components
- `lib/` - Utilities and configurations

## Usage

Templates are used by Robin when creating new projects. You typically don't interact with these directly - Robin handles it when you request a new application.

Example:
```
User: "Create a new Next.js app for a todo application"
Robin: [Uses full-stack template, customizes for todo feature]
```
