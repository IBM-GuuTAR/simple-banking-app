'use client'

import { ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

import { theme } from '@/theme/theme'

type Props = {
  children: ReactNode
}

export default function RootProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
