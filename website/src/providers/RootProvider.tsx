'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'

import { theme } from '@/theme/theme'

import { AppDataProvider } from '@/providers/AppDataProvider'

type Props = {
  children: ReactNode
}

export default function RootProvider({ children }: Props) {
  return (
    <AppDataProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppDataProvider>
  )
}
