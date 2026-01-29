'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { CircularProgress } from '@mui/material'

import { useAppData } from '@/providers/AppDataProvider'

import Redirect from '@/views/components/core/Redirect'

type Props = {
  children: ReactNode
}

export default function Rendering({ children }: Props) {
  const pathname = usePathname()

  const { isDataLoaded, displayName } = useAppData()

  if (!isDataLoaded) return <CircularProgress color="secondary" />
  else if (pathname !== '/login' && !displayName) return <Redirect path="/login" />
  return children
}
