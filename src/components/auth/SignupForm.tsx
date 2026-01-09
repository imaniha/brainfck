import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { AuthCard, AuthCardHeader, AuthCardTitle, AuthCardDescription, AuthForm, AuthCardFooter } from '../ui'
import { AuthInputWrapper } from '../ui/AuthInput'
import { AuthButton } from '../ui/AuthButton'
import { XStack, Text, Anchor } from 'tamagui'

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  name: z.string().min(1, 'Name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

interface SignupFormProps {
  onSwitchToLogin?: () => void
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'An error occurred during signup')
        return
      }

      // Auto-login after successful signup
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError('Account created but login failed. Please try logging in.')
      } else {
        router.push('/profile')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Create Account</AuthCardTitle>
        <AuthCardDescription>
          Sign up to get started with your new account
        </AuthCardDescription>
      </AuthCardHeader>

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <AuthInputWrapper label="Name" error={errors.name?.message}>
          <input
            {...register('name')}
            type="text"
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </AuthInputWrapper>

        <AuthInputWrapper label="Email" error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </AuthInputWrapper>

        <AuthInputWrapper label="Password" error={errors.password?.message}>
          <input
            {...register('password')}
            type="password"
            placeholder="Create a password (min 8 characters)"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </AuthInputWrapper>

        <AuthInputWrapper label="Confirm Password" error={errors.confirmPassword?.message}>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm your password"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px',
            }}
          />
        </AuthInputWrapper>

        {error && (
          <Text color="$red10" fontSize="$3" textAlign="center">
            {error}
          </Text>
        )}

        <AuthButton type="submit" loading={isLoading} width="100%">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </AuthButton>
      </AuthForm>

      <AuthCardFooter>
        <XStack justifyContent="center" space="$2">
          <Text fontSize="$3" color="$gray11">
            Already have an account?
          </Text>
          <Anchor
            fontSize="$3"
            color="$blue10"
            hoverStyle={{ color: '$blue11' }}
            onPress={onSwitchToLogin}
            style={{ cursor: 'pointer' }}
          >
            Sign in
          </Anchor>
        </XStack>
      </AuthCardFooter>
    </AuthCard>
  )
}