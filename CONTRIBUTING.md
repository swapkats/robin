# Contributing to Robin

Thank you for your interest in Robin! This document outlines our contribution guidelines and what you need to know before contributing.

## Robin's Philosophy

> **"Functional > Beautiful. Deployed > Perfect. Opinionated > Flexible."**

Robin is **hyper-opinionated by design**. This is not a bug—it's our core feature. We deliberately eliminate choices to help developers ship faster.

## What We Accept

We welcome contributions that improve Robin **within its existing constraints**:

### ✅ Bug Fixes
- Fix broken functionality
- Correct TypeScript errors
- Resolve installation issues
- Fix documentation errors

### ✅ Documentation Improvements
- Clarify existing documentation
- Add missing examples
- Fix typos and grammar
- Improve code comments

### ✅ Template Improvements
- Better DynamoDB patterns (within single-table design)
- Improved Next.js component examples
- Additional TypeScript types
- Performance optimizations

### ✅ New Templates
- Additional application templates (e-commerce, social network, etc.)
- Must follow Robin's enforced stack
- Must use single-table DynamoDB design
- Must be production-ready

### ✅ Test Coverage
- Add missing tests
- Improve test quality
- Add E2E test scenarios

## What We Reject

We will **immediately close PRs** that attempt to:

### ❌ Add Flexibility or Configuration Options
- "Add support for Pages Router" → **NO**
- "Make the database configurable" → **NO**
- "Let users choose their styling library" → **NO**
- "Add a config file for options" → **NO**

### ❌ Alternative Technology Choices
- Supporting Prisma, PostgreSQL, MongoDB → **NO**
- Adding CSS-in-JS, Emotion, styled-components → **NO**
- Supporting other frameworks (Remix, SvelteKit) → **NO**
- Alternative auth solutions → **NO**

### ❌ Weakening Opinions
- Making TypeScript optional → **NO**
- Allowing JavaScript files → **NO**
- Relaxing ESLint rules → **NO**
- Making tests optional → **NO**

### ❌ Feature Creep
- Complex new features that contradict simplicity
- Features that require configuration
- Features that add choice

## Why We're So Strict

Robin succeeds **because** of its constraints, not despite them:

1. **Eliminates decision fatigue** - One way to do things
2. **Reduces maintenance burden** - Less code, fewer edge cases
3. **Improves quality** - Deep optimization of one path
4. **Faster shipping** - No debates, just build
5. **Educational value** - Learn by doing, not configuring

If you want flexibility, Robin is not the right tool. And that's okay!

## How to Contribute

### Before You Start

1. **Open an issue first** - Discuss your idea before coding
2. **Check existing issues** - Someone may already be working on it
3. **Understand the philosophy** - Read this document thoroughly

### Contribution Process

1. **Fork the repository**
   ```bash
   gh repo fork swapkats/robin
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b fix/your-bug-fix
   # or
   git checkout -b docs/improve-readme
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Test locally**
   ```bash
   # Test the plugin installation
   /plugin marketplace add ./path/to/your-fork
   /plugin install robin@dev
   ```

5. **Commit with conventional commits**
   ```bash
   git commit -m "fix: correct DynamoDB query in user repository"
   git commit -m "docs: clarify single-table design rationale"
   git commit -m "feat: add e-commerce template"
   ```

6. **Push and create PR**
   ```bash
   git push origin your-branch
   gh pr create
   ```

### PR Guidelines

Your PR should:

- ✅ Have a clear, descriptive title
- ✅ Explain **why** the change is needed
- ✅ Include tests if changing code
- ✅ Update documentation if needed
- ✅ Follow existing code style
- ✅ Pass all CI checks

We will review PRs as time permits. Please be patient!

## Code Style

Robin follows strict standards:

### TypeScript
- **Strict mode** always enabled
- **No `any` types** (use `unknown` if needed)
- **Explicit return types** on exported functions
- **Zod schemas** for runtime validation

### Formatting
- **Prettier** handles all formatting automatically
- **ESLint** enforces code quality
- Run `npm run format` before committing

### Testing
- **Vitest** for unit tests
- **Playwright** for E2E tests
- **80% coverage minimum** for new code

### Commits
- **Conventional Commits** format
- **Clear, descriptive messages**
- **One logical change per commit**

## Questions?

- **Issues**: Open a GitHub issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Not Support**: Issues are not a support forum

Please search existing issues before opening new ones!

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing to Robin, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for respecting Robin's opinionated nature!**

We appreciate contributions that improve Robin within its constraints. If you want a flexible, configurable alternative, consider forking and creating your own tool—that's the beauty of open source!
