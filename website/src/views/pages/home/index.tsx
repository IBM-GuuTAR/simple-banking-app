'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { Button, Container, Stack, Typography } from '@mui/material'

import Redirect from '@/views/components/core/Redirect'

import { ContentContainer, PageContainer, TransactionContainer } from './style'

export default function Homepage() {
  const serachParams = useSearchParams()

  const user: string | null = useMemo(() => serachParams.get('user'), [serachParams])

  if (!user) return <Redirect path="/login" />

  return (
    <Container>
      <PageContainer>
        <ContentContainer>
          <Typography variant="body1">Total Balance</Typography>
          <Typography variant="h5">฿ 10000</Typography>
        </ContentContainer>
        <Stack>
          <Button variant="contained">Tranfer Money</Button>
        </Stack>
        <ContentContainer>
          <Typography variant="h6">Transaction History</Typography>
          <Stack gap={2}>
            <Stack>
              <TransactionContainer>
                <Typography variant="body1">Tranfer</Typography>
                <Typography variant="body1">- ฿ 10000</Typography>
              </TransactionContainer>
              <Typography variant="body1">to Jake Poorguy</Typography>
            </Stack>
            <Stack>
              <TransactionContainer>
                <Typography variant="body1">Receive</Typography>
                <Typography variant="body1">+ ฿ 10000</Typography>
              </TransactionContainer>
              <Typography variant="body1">from Jake Poorguy</Typography>
            </Stack>
            <Stack>
              <TransactionContainer>
                <Typography variant="body1">Tranfer</Typography>
                <Typography variant="body1">- ฿ 10000</Typography>
              </TransactionContainer>
              <Typography variant="body1">to Jake Poorguy</Typography>
            </Stack>
            <Stack>
              <TransactionContainer>
                <Typography variant="body1">Receive</Typography>
                <Typography variant="body1">+ ฿ 10000</Typography>
              </TransactionContainer>
              <Typography variant="body1">from Jake Poorguy</Typography>
            </Stack>
          </Stack>
        </ContentContainer>
      </PageContainer>
    </Container>
  )
}
