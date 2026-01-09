'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Link from 'next/link'
import { ProfileForm } from '@/components/auth'
import { YStack, XStack, Text, Anchor, Button } from 'tamagui'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
        <Text fontSize="$4">Loading...</Text>
      </YStack>
    )
  }

  if (!session) {
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
        <ProfileForm />

        <XStack justifyContent="center" space="$2">
          <Text fontSize="$3" color="$gray11">
            ← Back to
          </Text>
          <Link href="/" passHref>
            <Anchor
              fontSize="$3"
              color="$blue10"
              hoverStyle={{ color: '$blue11' }}
            >
              home
            </Anchor>
          </Link>
        </XStack>
      </YStack>
    </YStack>
  )
}