'use client'

import { ReactNode } from 'react'
import { Grid, Stack } from '@mui/material'

import Manager from '@/views/components/common/Manager'
import NavBar from '@/views/components/common/Navbar'

import { AppContainer } from './style'

type Props = {
  children: ReactNode
}

export default function AppContent({ children }: Props) {
  return (
    <Grid container>
      <Grid size={6}>
        <Stack alignItems="center">
          <Manager />
        </Stack>
      </Grid>
      <Grid size={6}>
        <Stack alignItems="center">
          <AppContainer>
            <NavBar />
            {children}
          </AppContainer>
        </Stack>
      </Grid>
    </Grid>
  )
}
