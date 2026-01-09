// Simple in-memory rate limiter for authentication endpoints
// In production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private attempts = new Map<string, RateLimitEntry>()
  private readonly maxAttempts = 5
  private readonly windowMs = 15 * 60 * 1000 // 15 minutes

  isRateLimited(identifier: string): boolean {
    const entry = this.attempts.get(identifier)
    const now = Date.now()

    if (!entry || now > entry.resetTime) {
      // Reset or create new entry
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return false
    }

    if (entry.count >= this.maxAttempts) {
      return true // Rate limited
    }

    entry.count++
    return false
  }

  getRemainingAttempts(identifier: string): number {
    const entry = this.attempts.get(identifier)
    if (!entry) return this.maxAttempts

    const now = Date.now()
    if (now > entry.resetTime) {
      return this.maxAttempts
    }

    return Math.max(0, this.maxAttempts - entry.count)
  }

  getResetTime(identifier: string): number {
    const entry = this.attempts.get(identifier)
    return entry?.resetTime || 0
  }

  // Clean up expired entries (optional, for memory management)
  cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.attempts.entries()) {
      if (now > entry.resetTime) {
        this.attempts.delete(key)
      }
    }
  }
}

export const authRateLimiter = new RateLimiter()

// Helper function to get client identifier (IP address)
export function getClientIdentifier(request: Request): string {
  // Get IP from various headers (in production, use a proper IP extraction method)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')

  // Use the first available IP, fallback to a default for development
  const ip = forwarded?.split(',')[0]?.trim() ||
             realIP ||
             clientIP ||
             'unknown'

  return ip
}