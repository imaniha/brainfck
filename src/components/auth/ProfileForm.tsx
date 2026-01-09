import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { AuthCard, AuthCardHeader, AuthCardTitle, AuthForm } from '../ui'
import { AuthInputWrapper } from '../ui/AuthInput'
import { AuthButton } from '../ui/AuthButton'
import { XStack, YStack, Text, Separator } from 'tamagui'

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

type ProfileFormData = z.infer<typeof profileSchema>

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  // Load user profile data
  useEffect(() => {
    if (session?.user?.name) {
      setValue('name', session.user.name)
    }
  }, [session, setValue])

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to update profile')
        return
      }

      setSuccess('Profile updated successfully!')
      // Update the session with new data
      window.location.reload()
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: '/' })
    setIsLoading(false)
  }

  if (status === 'loading') {
    return (
      <AuthCard>
        <Text textAlign="center" fontSize="$4">
          Loading profile...
        </Text>
      </AuthCard>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardTitle>Profile</AuthCardTitle>
        <Text fontSize="$3" color="$gray11">
          Manage your account information
        </Text>
      </AuthCardHeader>

      <YStack space="$4">
        {/* Profile Information Display */}
        <YStack space="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" fontWeight="500" color="$gray12">
              Email
            </Text>
            <Text fontSize="$3" color="$gray11">
              {session.user.email}
            </Text>
          </XStack>

          <Separator />
        </YStack>

        {/* Profile Update Form */}
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <AuthInputWrapper label="Name" error={errors.name?.message}>
            <input
              {...register('name')}
              type="text"
              placeholder="Enter your name"
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

          {success && (
            <Text color="$green10" fontSize="$3" textAlign="center">
              {success}
            </Text>
          )}

          <AuthButton
            type="submit"
            loading={isUpdating}
            disabled={!isDirty}
            width="100%"
          >
            {isUpdating ? 'Updating...' : 'Update Profile'}
          </AuthButton>
        </AuthForm>

        <Separator />

        {/* Sign Out */}
        <AuthButton
          variant="secondary"
          onPress={handleSignOut}
          loading={isLoading}
          width="100%"
        >
          {isLoading ? 'Signing Out...' : 'Sign Out'}
        </AuthButton>
      </YStack>
    </AuthCard>
  )
}