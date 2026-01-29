'use client'

import { AppBar, Avatar, Container, Stack, Typography } from '@mui/material'

import { AppBarContainer } from './style'

export default function NavBar() {
  return (
    <AppBar position="fixed" color="secondary" sx={{ position: 'relative' }}>
      <Container>
        <AppBarContainer>
          <Typography variant="h6">Simple Bank</Typography>
          {/* TODO: Add real data */}
          <Stack>
            <Avatar>G</Avatar>
          </Stack>
        </AppBarContainer>
      </Container>
    </AppBar>
  )
}
