import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { AuthCard, AuthCardHeader, AuthCardTitle, AuthCardDescription, AuthForm, AuthCardFooter } from './ui'
import { AuthInputWrapper } from './ui/AuthInput'
import { AuthButton } from './ui/AuthButton'
import { XStack, Text, Anchor } from 'tamagui'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSwitchToSignup?: () => void
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
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
        <AuthCardTitle>Welcome Back</AuthCardTitle>
        <AuthCardDescription>
          Sign in to your account to continue
        </AuthCardDescription>
      </AuthCardHeader>

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Enter your password"
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
          {isLoading ? 'Signing In...' : 'Sign In'}
        </AuthButton>
      </AuthForm>

      <AuthCardFooter>
        <XStack justifyContent="center" space="$2">
          <Text fontSize="$3" color="$gray11">
            Don't have an account?
          </Text>
          <Anchor
            fontSize="$3"
            color="$blue10"
            hoverStyle={{ color: '$blue11' }}
            onPress={onSwitchToSignup}
            style={{ cursor: 'pointer' }}
          >
            Sign up
          </Anchor>
        </XStack>
      </AuthCardFooter>
    </AuthCard>
  )
}