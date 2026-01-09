'use client'

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../../tamagui.config'
import { AuthProvider } from '../providers/AuthProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </TamaguiProvider>
  )
}