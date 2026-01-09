# Landing Page with Email/Password Authentication and User Profile Management

## Overview

Implement a complete authentication system for the existing Next.js 16 application, including a landing page with hero section, separate login and signup pages, JWT-based session management, and basic user profile management. The system will use NextAuth.js (Auth.js) v5 with a PostgreSQL database for secure authentication and user data storage.

## Problem Statement

The current Next.js application has only a default landing page with no authentication or user management capabilities. Users cannot create accounts, log in, or manage their profile information. This blocks the ability to build user-specific features and protect content behind authentication.

## Jobs to be Done

When a new visitor arrives at the application, they want to understand what the application offers and easily create an account, so they can access personalized features.

When a returning user visits the application, they want to quickly log in with their credentials, so they can access their account and continue their work.

When a logged-in user wants to view or update their profile, they want a simple interface to manage their basic information, so they can keep their account details current.

## User Stories

### Landing Page
- As a visitor, I want to see a hero section explaining the application's purpose, so I can understand what it offers
- As a visitor, I want clear navigation to login and signup pages, so I can easily access authentication

### Authentication
- As a new user, I want to create an account with email and password, so I can access the application
- As a returning user, I want to log in with my email and password, so I can access my account
- As a logged-in user, I want to log out securely, so I can end my session

### Profile Management
- As a logged-in user, I want to view my profile information (name, email), so I can verify my account details
- As a logged-in user, I want to update my name, so I can keep my profile current

## Functional Requirements

### Landing Page (Public)
- Hero section with application title and description
- Navigation header with "Login" and "Sign Up" buttons
- Responsive design matching existing Tailwind CSS 4 styling
- Dark mode support consistent with current implementation

### Authentication Pages

#### Sign Up Page (/signup)
- Email input field with validation (valid email format)
- Password input field with validation (minimum 8 characters)
- Confirm password field with matching validation
- Name input field (required)
- "Create Account" submit button
- Link to login page for existing users
- Display validation errors inline
- Redirect to profile page on successful signup

#### Login Page (/login)
- Email input field
- Password input field
- "Log In" submit button
- Link to signup page for new users
- Display authentication errors (invalid credentials)
- Redirect to profile page on successful login

### Profile Page (/profile) - Protected Route
- Display current user's name and email
- Editable name field with save button
- "Log Out" button
- Redirect to login page if not authenticated

## Technical Requirements

### Authentication Framework
- **NextAuth.js v5** (Auth.js) for authentication
- **Credentials provider** for email/password authentication
- **JWT strategy** for session management
- **bcrypt** for password hashing (minimum 10 salt rounds)

### Database
- **PostgreSQL** database for user data storage
- **Prisma ORM** for database access and migrations
- Database schema:
  - Users table: id (UUID), email (unique), password (hashed), name, createdAt, updatedAt

### API Endpoints

#### POST /api/auth/signup
**Purpose**: Create new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Responses**:
- **201 Created**: User created successfully
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```
- **400 Bad Request**: Validation errors
  ```json
  {
    "error": "Email already exists" | "Invalid email format" | "Password must be at least 8 characters"
  }
  ```
- **500 Internal Server Error**: Server error
  ```json
  {
    "error": "Failed to create user"
  }
  ```

#### POST /api/auth/[...nextauth]
**Purpose**: NextAuth.js authentication endpoints (handled by framework)
- Handles login, logout, session management
- JWT token generation and validation
- Credentials verification

#### GET /api/user/profile
**Purpose**: Get current user's profile

**Headers**: 
- Authorization: Bearer {jwt_token}

**Responses**:
- **200 OK**: Profile retrieved
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```
- **401 Unauthorized**: Not authenticated
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### PATCH /api/user/profile
**Purpose**: Update user's profile information

**Headers**: 
- Authorization: Bearer {jwt_token}

**Request Body**:
```json
{
  "name": "Jane Doe"
}
```

**Responses**:
- **200 OK**: Profile updated
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "Jane Doe"
    }
  }
  ```
- **400 Bad Request**: Validation error
  ```json
  {
    "error": "Name is required"
  }
  ```
- **401 Unauthorized**: Not authenticated

### Security Requirements
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiration
- HTTP-only cookies for JWT storage
- CSRF protection enabled
- Input validation and sanitization on all forms
- Rate limiting on authentication endpoints (5 attempts per 15 minutes per IP)

### Environment Variables
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_SECRET="random-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

## User Experience Requirements

### Page Structure

#### Landing Page (/) - Public
- **Header**: Logo/title, Login button, Sign Up button
- **Hero Section**: Application title, description, primary CTA (Sign Up)
- **Footer**: Links, copyright

#### Login Page (/login) - Public
- Centered card layout (max-width: 400px)
- Form fields stacked vertically
- "Don't have an account? Sign up" link below form

#### Sign Up Page (/signup) - Public
- Centered card layout (max-width: 400px)
- Form fields stacked vertically
- "Already have an account? Log in" link below form

#### Profile Page (/profile) - Protected
- Header with logout button
- Profile card showing user information
- Editable fields with save button

### UI States

#### Form States
- **Default**: Empty fields, enabled submit button
- **Loading**: Disabled fields, loading spinner on submit button
- **Error**: Red border on invalid fields, error message below field
- **Success**: Redirect to next page

#### Protected Route States
- **Loading**: Show loading spinner while checking authentication
- **Authenticated**: Display page content
- **Unauthenticated**: Redirect to /login

### Responsive Design
- Mobile (< 640px): Full-width forms with padding
- Tablet/Desktop (≥ 640px): Centered cards with max-width
- Maintain existing dark mode support

### Error Handling

#### Authentication Errors
- **Invalid credentials**: "Invalid email or password"
- **Email already exists**: "An account with this email already exists"
- **Network error**: "Unable to connect. Please try again."
- **Server error**: "Something went wrong. Please try again later."

#### Validation Errors
- **Invalid email**: "Please enter a valid email address"
- **Weak password**: "Password must be at least 8 characters"
- **Password mismatch**: "Passwords do not match"
- **Missing field**: "This field is required"

### Accessibility
- All form inputs have associated labels
- Error messages announced to screen readers
- Keyboard navigation support (Tab, Enter)
- Focus indicators on interactive elements
- ARIA labels for icon buttons

## Data Model

### User Entity (new)
**Purpose**: Store user account information and credentials

**Fields**:
- id: string (UUID, primary key)
- email: string (unique, indexed)
- password: string (bcrypt hashed)
- name: string
- createdAt: timestamp
- updatedAt: timestamp

**Data Integrity**:
- Email must be unique and valid format
- Password must be hashed before storage
- Timestamps automatically managed by Prisma

## Integration Points

### NextAuth.js Configuration
- Configure in `src/app/api/auth/[...nextauth]/route.ts`
- Credentials provider with email/password validation
- JWT strategy with custom token payload
- Session callback to include user data

### Prisma Setup
- Schema definition in `prisma/schema.prisma`
- Database migrations via `npx prisma migrate dev`
- Prisma Client generation for type-safe queries

### Middleware
- Create `middleware.ts` for protected route handling
- Redirect unauthenticated users to /login
- Allow public access to /, /login, /signup

## Out of Scope

### Features Deferred
- **OAuth providers** (Google, GitHub) - Trigger: User requests social login
- **Email verification** - Trigger: Security requirements increase
- **Password reset functionality** - Trigger: User support requests exceed 5/week
- **Two-factor authentication** - Trigger: Security audit recommendation
- **Profile picture upload** - Trigger: User requests avatar functionality
- **Account deletion** - Trigger: GDPR compliance requirement

### Technical Complexity Deferred
- **Redis session storage** - Trigger: Concurrent users exceed 1000
- **Rate limiting with Redis** - Trigger: Abuse detection needed
- **Email service integration** - Trigger: Email verification implemented

## Acceptance Criteria

### Landing Page
- **Given** I am a visitor, **when** I navigate to the root URL (/), **then** I see a hero section with application description and navigation buttons for Login and Sign Up
- **Given** I am on the landing page, **when** I click the "Sign Up" button, **then** I am redirected to /signup
- **Given** I am on the landing page, **when** I click the "Login" button, **then** I am redirected to /login

### Sign Up Flow
- **Given** I am on the signup page, **when** I enter valid email, password (8+ chars), matching confirm password, and name, then click "Create Account", **then** my account is created and I am redirected to /profile with an active session
- **Given** I am on the signup page, **when** I enter an email that already exists, **then** I see an error message "An account with this email already exists"
- **Given** I am on the signup page, **when** I enter a password less than 8 characters, **then** I see an error message "Password must be at least 8 characters"
- **Given** I am on the signup page, **when** I enter non-matching passwords, **then** I see an error message "Passwords do not match"

### Login Flow
- **Given** I have an existing account, **when** I enter correct email and password on /login and click "Log In", **then** I am redirected to /profile with an active session
- **Given** I am on the login page, **when** I enter incorrect credentials, **then** I see an error message "Invalid email or password"
- **Given** I am on the login page, **when** I click "Sign up" link, **then** I am redirected to /signup

### Profile Management
- **Given** I am logged in, **when** I navigate to /profile, **then** I see my name and email displayed
- **Given** I am logged in and on /profile, **when** I update my name and click "Save", **then** my name is updated and I see a success confirmation
- **Given** I am logged in and on /profile, **when** I click "Log Out", **then** my session is terminated and I am redirected to the landing page
- **Given** I am not logged in, **when** I try to access /profile, **then** I am redirected to /login

### Security
- **Given** a user signs up, **when** their password is stored in the database, **then** it is hashed with bcrypt (not stored in plain text)
- **Given** a user logs in successfully, **when** a JWT token is generated, **then** it expires after 7 days
- **Given** a user makes 5 failed login attempts, **when** they try again within 15 minutes, **then** they are rate limited

### Responsive Design
- **Given** I am on any authentication page, **when** I view it on mobile (<640px), **then** forms are full-width with appropriate padding
- **Given** I am on any authentication page, **when** I view it on desktop (≥640px), **then** forms are centered with max-width of 400px
- **Given** dark mode is enabled, **when** I view any page, **then** all elements use appropriate dark mode colors