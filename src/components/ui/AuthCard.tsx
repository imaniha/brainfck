import { Card, styled, XStack, YStack, Text } from 'tamagui'

// Card container for authentication forms
export const AuthCard = styled(Card, {
  width: '100%',
  maxWidth: 400,
  padding: '$6',
  borderRadius: '$6',
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
})

// Card header with title and description
export const AuthCardHeader = styled(YStack, {
  alignItems: 'center',
  marginBottom: '$6',
  space: '$2',
})

export const AuthCardTitle = styled(Text, {
  fontSize: '$6',
  fontWeight: 'bold',
  color: '$color',
  textAlign: 'center',
})

export const AuthCardDescription = styled(Text, {
  fontSize: '$3',
  color: '$gray11',
  textAlign: 'center',
  maxWidth: 300,
})

// Form container within card
export const AuthForm = styled(YStack, {
  tag: 'form',
  space: '$4',
  width: '100%',
})

// Footer area for links
export const AuthCardFooter = styled(YStack, {
  alignItems: 'center',
  marginTop: '$4',
  space: '$2',
})