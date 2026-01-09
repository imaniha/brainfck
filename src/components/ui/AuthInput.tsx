import { Input, styled, Text } from 'tamagui'

// Styled input component for authentication forms
export const AuthInput = styled(Input, {
  size: '$4',
  borderWidth: 1,
  borderColor: '$gray8',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  focusStyle: {
    borderColor: '$blue10',
    outlineWidth: 0,
  },
  variants: {
    error: {
      true: {
        borderColor: '$red10',
        focusStyle: {
          borderColor: '$red10',
        },
      },
    },
  } as const,
})

// Input wrapper with label and error display
interface AuthInputWrapperProps {
  label: string
  error?: string
  children: React.ReactNode
}

export function AuthInputWrapper({ label, error, children }: AuthInputWrapperProps) {
  return (
    <>
      <Text fontSize="$3" fontWeight="500" color="$gray12" marginBottom="$2">
        {label}
      </Text>
      {children}
      {error && (
        <Text fontSize="$2" color="$red10" marginTop="$1">
          {error}
        </Text>
      )}
    </>
  )
}