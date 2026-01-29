'use client'

import { Button, Container, Stack, Typography } from '@mui/material'

import { PageContainer } from './style'

// TODO: Add real data
export default function SelectUserPage() {
  return (
    <PageContainer>
      <Container>
        <Stack gap={1}>
          <Typography variant="h6" align="center">
            Select Account
          </Typography>
          <Button variant="outlined">
            <Stack gap={1}>
              <Typography variant="body1">John Richman</Typography>
              <Typography variant="caption">Balance: 10000฿</Typography>
            </Stack>
          </Button>
          <Button variant="outlined">
            <Stack gap={1}>
              <Typography variant="body1">Jake Poorguy</Typography>
              <Typography variant="caption">Balance: 10000฿</Typography>
            </Stack>
          </Button>
        </Stack>
      </Container>
    </PageContainer>
  )
}
