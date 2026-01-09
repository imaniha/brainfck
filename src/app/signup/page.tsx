'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Link from 'next/link'
import { SignupForm } from '@/components/auth'
import { YStack, XStack, Text, Anchor } from 'tamagui'

export default function SignupPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/profile')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
        <Text fontSize="$4">Loading...</Text>
      </YStack>
    )
  }

  if (session) {
    return null // Will redirect
  }

  return (
    <YStack
      flex={1}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      padding="$4"
      backgroundColor="$background"
    >
      <YStack width="100%" maxWidth={400} alignItems="center" space="$4">
        <SignupForm
          onSwitchToLogin={() => router.push('/login')}
        />

        <XStack justifyContent="center" space="$2">
          <Text fontSize="$3" color="$gray11">
            Already have an account?
          </Text>
          <Link href="/login">
            <Anchor
              fontSize="$3"
              color="$blue10"
              hoverStyle={{ color: '$blue11' }}
            >
              Sign in here
            </Anchor>
          </Link>
        </XStack>
      </YStack>
    </YStack>
  )
}