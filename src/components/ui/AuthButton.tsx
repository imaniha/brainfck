import { Button, styled } from 'tamagui'

// Base button with loading state
export const AuthButton = styled(Button, {
  size: '$4',
  backgroundColor: '$blue10',
  color: 'white',
  borderRadius: '$4',
  pressStyle: {
    backgroundColor: '$blue11',
  },
  hoverStyle: {
    backgroundColor: '$blue11',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue10',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$gray5',
        color: '$gray12',
        borderWidth: 1,
        borderColor: '$gray8',
      },
      danger: {
        backgroundColor: '$red10',
        color: 'white',
      },
    },
    loading: {
      true: {
        opacity: 0.6,
        pointerEvents: 'none',
      },
    },
  } as const,
})