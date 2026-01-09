'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { YStack, XStack, Text, Button, H1, Paragraph, Anchor, Separator } from 'tamagui'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
        <Text fontSize="$4">Loading...</Text>
      </YStack>
    )
  }

  return (
    <YStack flex={1} minHeight="100vh" backgroundColor="$background">
      {/* Navigation Header */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$6"
        paddingVertical="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text fontSize="$6" fontWeight="bold" color="$color">
          BrainFCK
        </Text>

        <XStack space="$4" alignItems="center">
          {session ? (
            <>
              <Text fontSize="$3" color="$gray11">
                Welcome, {session.user.name}
              </Text>
              <Link href="/profile" passHref>
                <Anchor
                  fontSize="$3"
                  color="$blue10"
                  hoverStyle={{ color: '$blue11' }}
                  style={{ cursor: 'pointer' }}
                >
                  Profile
                </Anchor>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Anchor
                  fontSize="$3"
                  color="$gray12"
                  hoverStyle={{ color: '$blue10' }}
                  style={{ cursor: 'pointer' }}
                >
                  Login
                </Anchor>
              </Link>
              <Link href="/signup" passHref>
                <Button size="$3" theme="blue">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </XStack>
      </XStack>

      {/* Hero Section */}
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$6"
        paddingVertical="$8"
        space="$6"
        maxWidth={800}
        alignSelf="center"
        width="100%"
      >
        <YStack space="$4" alignItems="center" textAlign="center">
          <H1
            fontSize="$9"
            fontWeight="bold"
            color="$color"
            lineHeight="$9"
            maxWidth={600}
          >
            Welcome to BrainFCK
          </H1>

          <Paragraph
            fontSize="$5"
            color="$gray11"
            lineHeight="$6"
            maxWidth={500}
            textAlign="center"
          >
            A secure authentication system built with Next.js, providing seamless user management
            and profile customization for your applications.
          </Paragraph>
        </YStack>

        {!session && (
          <XStack space="$4" alignItems="center">
            <Link href="/signup" passHref>
              <Button size="$5" theme="blue" fontWeight="600">
                Get Started
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Anchor
                fontSize="$4"
                color="$blue10"
                hoverStyle={{ color: '$blue11' }}
                style={{ cursor: 'pointer' }}
              >
                Sign In
              </Anchor>
            </Link>
          </XStack>
        )}

        {session && (
          <YStack space="$4" alignItems="center">
            <Text fontSize="$4" color="$gray11">
              You're signed in as {session.user.email}
            </Text>
            <Link href="/profile" passHref>
              <Button size="$4" theme="blue">
                Go to Profile
              </Button>
            </Link>
          </YStack>
        )}
      </YStack>

      {/* Footer */}
      <YStack
        paddingHorizontal="$6"
        paddingVertical="$4"
        borderTopWidth={1}
        borderTopColor="$borderColor"
        alignItems="center"
      >
        <XStack space="$6" alignItems="center">
          <Text fontSize="$2" color="$gray10">
            © 2026 BrainFCK. Built with Next.js and Tamagui.
          </Text>
          <Separator vertical />
          <Anchor
            href="https://github.com/imaniha/brainfck"
            target="_blank"
            rel="noopener noreferrer"
            fontSize="$2"
            color="$gray10"
            hoverStyle={{ color: '$blue10' }}
          >
            View on GitHub
          </Anchor>
        </XStack>
      </YStack>
    </YStack>
  )
}
