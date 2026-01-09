# BrainFCK - Authentication System

A secure, full-featured authentication system built with Next.js 15, NextAuth.js v5, PostgreSQL, and Tamagui UI components.

## 🚀 Features

### Core Authentication
- User registration with email/password
- Secure login with session management
- Profile management and updates
- JWT-based authentication (7-day expiration)

### Security Features
- bcrypt password hashing (10 salt rounds)
- Rate limiting (5 attempts per 15 minutes per IP)
- Security headers (XSS, clickjacking, MIME protection)
- Server-side route protection
- Input validation and sanitization

### User Interface
- Responsive design with Tamagui components
- Mobile-first approach
- Dark mode support
- Form validation with real-time feedback
- Loading states and error handling

### Technical Stack
- **Frontend:** Next.js 15 (App Router), React, TypeScript
- **UI:** Tamagui, Tailwind CSS v4
- **Authentication:** NextAuth.js v5 with Credentials provider
- **Database:** PostgreSQL with Prisma ORM
- **Forms:** React Hook Form + Zod validation
- **Infrastructure:** Docker Compose

## 📋 Prerequisites

- Node.js 18+
- Docker and Docker Compose
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/imaniha/brainfck.git
cd brainfck
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the database
```bash
docker-compose up -d
```

### 4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# (Optional) Push schema to database
DATABASE_URL="postgresql://postgres:password123@localhost:5432/brainfck" npx prisma db push
```

### 5. Configure environment variables
```bash
# Copy and edit environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### 6. Start the development server
```bash
npm run dev
```

## 🌐 Usage

### Accessing the Application
- **Application:** http://localhost:3000
- **Database Admin:** http://localhost:8080
  - Email: admin@brainfck.com
  - Password: admin123

### Authentication Flow
1. Visit the landing page
2. Click "Sign Up" to create an account
3. Fill out the registration form
4. Automatically logged in and redirected to profile
5. Update profile information as needed
6. Sign out when finished

## 🧪 Testing

### Manual Testing
1. **Signup Flow**
   - Navigate to `/signup`
   - Enter valid email, password (8+ chars), and name
   - Verify account creation and auto-login

2. **Login Flow**
   - Navigate to `/login`
   - Enter credentials
   - Verify successful authentication

3. **Profile Management**
   - Access `/profile` (requires authentication)
   - Update name and save changes
   - Verify profile updates

4. **Security Testing**
   - Attempt rate limiting (5+ signup attempts)
   - Test protected route access without authentication
   - Verify security headers in API responses

### API Testing
```bash
# Test signup endpoint
curl -X POST http://localhost:3000/api/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test profile endpoint (requires authentication)
curl http://localhost:3000/api/user/profile \\
  -H "Authorization: Bearer {jwt_token}"
```

## 📁 Project Structure

```
brainfck/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/
│   │   ├── api/auth/signup/
│   │   ├── api/user/profile/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── profile/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   └── ui/
│   └── lib/
│       ├── auth.ts
│       ├── prisma.ts
│       ├── rate-limit.ts
│       └── security.ts
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── AGENTS.md
├── document.md
└── README.md
```

## 🔒 Security Features

- **Password Security:** bcrypt hashing with 10 salt rounds
- **Session Management:** JWT tokens with 7-day expiration
- **Rate Limiting:** 5 attempts per 15 minutes per IP address
- **Security Headers:** XSS protection, clickjacking prevention
- **Input Validation:** Comprehensive client and server-side validation
- **Route Protection:** Server-side middleware for protected routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NextAuth.js for authentication
- Tamagui for UI components
- Prisma for database tooling
