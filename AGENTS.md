# AGENTS.md - Development Guidelines for TypeScript/React Monorepo

This document provides essential information for AI agents working in this TypeScript/React monorepo project. It includes build commands, testing procedures, code style guidelines, and project conventions.

## Quick Start

### Development Environment Setup
```bash
# Install dependencies (assuming yarn workspaces with Turbo)
yarn install

# Start development servers
yarn dev

# For specific apps/packages
yarn dev:app     # Next.js web app
yarn dev:mobile  # Expo mobile app
```

### Build Commands
```bash
# Build all packages and apps
yarn build

# Build specific packages
yarn build:app      # Build Next.js application
yarn build:mobile   # Build Expo mobile app
yarn build:ui       # Build UI component library

# Production build with optimizations
yarn build:prod
```

### Testing Commands
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test -- path/to/test/file.test.ts

# Run tests for specific package
yarn test:ui       # Test UI components
yarn test:app      # Test Next.js app
yarn test:api      # Test API routes
```

### Linting and Code Quality
```bash
# Lint all code
yarn lint

# Lint and fix issues
yarn lint:fix

# Type checking
yarn typecheck

# Format code
yarn format
```

### Single Test Execution
```bash
# Run a single test file
yarn test path/to/specific.test.ts

# Run tests matching a pattern
yarn test -- --testNamePattern="should handle error cases"

# Debug a specific test
yarn test -- --testPathPattern="component.test.ts" --verbose
```

## Code Style Guidelines

### TypeScript and Type Definitions
- Use TypeScript for all code; prefer interfaces over types for object shapes
- Utilize Zod for schema validation and type inference
- Avoid enums; use literal types or maps instead
- Implement functional components with TypeScript interfaces for props
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)

### Component Structure and Exports
- Structure files with exported components, subcomponents, helpers, static content, and types
- Favor named exports for components and functions
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`)
- Write functional and declarative programming patterns; avoid classes

### Syntax and Formatting
- Use the `function` keyword for pure functions
- Write declarative JSX with clear and readable structure
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Prefer iteration and modularization over code duplication

### Imports and Dependencies
- Group imports: React imports first, then third-party libraries, then local imports
- Use absolute imports with path aliases (e.g., `@/components/Button`)
- Sort imports alphabetically within each group
- Avoid wildcard imports (`import * as ...`)

### Error Handling
- Prioritize error handling and edge cases at the beginning of functions
- Use early returns for error conditions to avoid deep nesting
- Utilize guard clauses to handle preconditions and invalid states early
- Implement proper error logging and user-friendly error messages
- Use custom error types or factories for consistent error handling

### State Management
- Use Zustand for global state management
- Use TanStack React Query for server state and data fetching
- Minimize the use of `useEffect` and `setState`; favor derived state and memoization

### UI and Styling
- Use Tamagui for cross-platform UI components and styling
- Implement responsive design with a mobile-first approach
- Ensure styling consistency between web and native applications
- Utilize Tamagui's theming capabilities for consistent design across platforms

### Internationalization
- Use i18next and react-i18next for web applications
- Use expo-localization for React Native apps
- Ensure all user-facing text is internationalized and supports localization

## Project Architecture

### Monorepo Structure
- Follow Turbo monorepo best practices
- Use `apps/` directory for Next.js and Expo applications
- Use `packages/` directory for shared code and components:
  - `packages/app/` - Shared application logic
  - `packages/ui/` - Shared UI components (Tamagui-based)
  - `packages/api/` - Shared API utilities and schemas

### Cross-Platform Development
- Use Solito for navigation in both web and mobile applications
- Implement platform-specific code using `.native.tsx` files for React Native components
- Handle images using `SolitoImage` for better cross-platform compatibility

### Backend Integration
- Use Supabase for backend services, authentication, and database interactions
- Follow Supabase security and performance guidelines
- Use Zod schemas to validate data exchanged with the backend

### Stripe Integration
- Implement Stripe for payment processing and subscription management
- Use Stripe's Customer Portal for subscription management
- Implement webhook handlers for Stripe events
- Sync subscription status with user data in Supabase

## Performance Optimization

### Web Performance
- Use dynamic imports for code splitting in Next.js
- Implement lazy loading for non-critical components
- Optimize images with appropriate formats, size data, and lazy loading
- Minimize bundle size and implement code splitting

### Mobile Performance
- Optimize for both iOS and Android performance
- Use appropriate image formats and compression
- Implement efficient list virtualization for large datasets
- Minimize bridge communication in React Native

## Testing Guidelines

### Test Structure
- Write unit tests for utility functions and hooks
- Write integration tests for component interactions
- Write E2E tests for critical user flows
- Use testing libraries compatible with React and React Native

### Test Naming Conventions
- Use descriptive test names that explain the behavior being tested
- Follow the pattern: `describe("ComponentName", () => { it("should behavior when condition", () => { ... }) })`
- Use `test` or `it` for individual test cases

### Mocking and Fixtures
- Mock external dependencies (Supabase, Stripe, etc.) in tests
- Use realistic test data and fixtures
- Clean up after tests to avoid state pollution

## Git and Version Control

### Commit Conventions
- Use descriptive and meaningful commit messages
- Follow conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branching Strategy
- Use feature branches for new development
- Use `main`/`master` for production-ready code
- Create pull requests for code review before merging

## Environment and Configuration

### Environment Variables
- Use `dotenv` for environment variable management
- Prefix environment variables appropriately (e.g., `NEXT_PUBLIC_` for client-side vars)
- Never commit sensitive credentials or secrets

### Platform-Specific Configuration
- Use `eas.json` for Expo Application Services configuration
- Use `next.config.js` for Next.js configuration
- Follow patterns for environment-specific configurations

## Code Generators

### Turbo Generators
- Use custom generators in `turbo/generators/` for creating:
  - Components: `yarn turbo gen component ComponentName`
  - Screens: `yarn turbo gen screen ScreenName`
  - tRPC routers: `yarn turbo gen router RouterName`

## Cursor Rules Integration

This project follows the Cursor rules defined in `.cursor/rules/next.md`, which include:
- Expert-level TypeScript, React, and Next.js development practices
- Tamagui for cross-platform UI components
- Supabase for backend services
- Comprehensive error handling and validation
- Performance optimization for web and mobile
- Monorepo management with Turbo
- Internationalization with i18next
- Stripe integration for subscriptions

## Quality Assurance

### Pre-commit Hooks
- Ensure linting passes before commits
- Run type checking on staged files
- Format code automatically

### Code Review Checklist
- Code follows established patterns and conventions
- Proper TypeScript typing throughout
- Error handling covers edge cases
- Tests cover critical functionality
- Performance optimizations implemented
- Accessibility considerations addressed
- Internationalization applied to user-facing text

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript errors and missing dependencies
- **Test failures**: Verify mocks and test environment setup
- **Styling issues**: Ensure Tamagui theme configuration
- **i18n problems**: Check translation keys and locale setup

### Debug Commands
```bash
# Clear caches
yarn clean
yarn turbo clean

# Reinstall dependencies
rm -rf node_modules
yarn install

# Reset Expo cache
yarn expo start --clear
```

---

*This document should be updated as the project evolves. Last updated: January 2026*