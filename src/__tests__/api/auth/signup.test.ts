import { POST } from '@/app/api/auth/signup/route'
import { prisma } from '@/lib/prisma'

describe('/api/auth/signup', () => {
  beforeEach(async () => {
    // Clean up test users
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['test@example.com', 'test2@example.com']
        }
      }
    })
  })

  it('should create a new user successfully', async () => {
    const requestBody = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    }

    // Mock NextRequest
    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.user).toHaveProperty('id')
    expect(data.user.email).toBe(requestBody.email)
    expect(data.user.name).toBe(requestBody.name)
    expect(data.user).not.toHaveProperty('password') // Password should not be returned
  })

  it('should return error for existing user', async () => {
    // First create a user
    await POST({
      json: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      })
    } as any)

    // Now try to create another with same email
    const requestBody = {
      email: 'test@example.com', // Same email as previous test
      password: 'password456',
      name: 'Test User 2'
    }

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('already exists')
  })

  it('should return validation error for invalid email', async () => {
    const requestBody = {
      email: 'invalid-email',
      password: 'password123',
      name: 'Test User'
    }

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input data')
  })

  it('should return validation error for short password', async () => {
    const requestBody = {
      email: 'test2@example.com',
      password: '123',
      name: 'Test User'
    }

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input data')
  })
})