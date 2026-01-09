import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { authRateLimiter, getClientIdentifier } from '@/lib/rate-limit'
import { addSecurityHeaders } from '@/lib/security'

const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 attempts per 15 minutes per IP
    const clientIP = getClientIdentifier(request)

    if (authRateLimiter.isRateLimited(clientIP)) {
      const resetTime = authRateLimiter.getResetTime(clientIP)
      const remainingMs = resetTime - Date.now()
      const remainingMinutes = Math.ceil(remainingMs / (60 * 1000))

      const response = NextResponse.json(
        {
          error: `Too many signup attempts. Please try again in ${remainingMinutes} minutes.`,
          retryAfter: remainingMs,
        },
        {
          status: 429,
          headers: {
            'Retry-After': remainingMs.toString(),
          },
        }
      )
      return addSecurityHeaders(response)
    }

    const body = await request.json()
    const { email, password, name } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return addSecurityHeaders(NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      ))
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return addSecurityHeaders(NextResponse.json(
      {
        user,
        message: 'User created successfully',
      },
      { status: 201 }
    ))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return addSecurityHeaders(NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      ))
    }

    console.error('Signup error:', error)
    return addSecurityHeaders(NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    ))
  }
}