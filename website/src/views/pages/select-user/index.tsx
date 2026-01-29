'use client'

import { Container, Stack, Typography } from '@mui/material'

import CoreButton from '@/views/components/core/CoreButton'

import { PageContainer } from './style'

// TODO: Add real data
export default function SelectUserPage() {
  return (
    <PageContainer>
      <Container>
        <Stack gap={2}>
          <Typography variant="h4" align="center">
            Select Account
          </Typography>
          <Stack gap={1}>
            <CoreButton variant="outlined" path="/?user='John Richman'" fullWidth>
              <Stack gap={1}>
                <Typography variant="body1">John Richman</Typography>
                <Typography variant="caption">Balance: 10000฿</Typography>
              </Stack>
            </CoreButton>
            <CoreButton variant="outlined" path="/?user='Jake Poorguy'" fullWidth>
              <Stack gap={1}>
                <Typography variant="body1">Jake Poorguy</Typography>
                <Typography variant="caption">Balance: 10000฿</Typography>
              </Stack>
            </CoreButton>
          </Stack>
        </Stack>
      </Container>
    </PageContainer>
  )
}
