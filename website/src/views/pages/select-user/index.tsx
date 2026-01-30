'use client'

import { redirect, RedirectType } from 'next/navigation'
import { useCallback } from 'react'
import { Container, Stack, Typography } from '@mui/material'

import { useAppData } from '@/providers/AppDataProvider'

import CoreButton from '@/views/components/core/CoreButton'

import { PageContainer } from './style'

export default function SelectUserPage() {
  const { selectUser, displayAccounts } = useAppData()

  const handleSelectUser = useCallback(
    (accountId: number) => {
      selectUser(accountId)
      redirect('/', RedirectType.push)
    },
    [selectUser],
  )

  return (
    <PageContainer>
      <Container>
        <Stack gap={2}>
          <Typography variant="h4" align="center">
            Select Account
          </Typography>
          <Stack gap={1}>
            {displayAccounts.map((account) => (
              <CoreButton key={account.id} variant="outlined" onClick={() => handleSelectUser(account.id)} fullWidth>
                <Stack gap={1}>
                  <Typography variant="body1">{account.displayName}</Typography>
                  <Typography variant="caption">Balance: {account.balance}฿</Typography>
                </Stack>
              </CoreButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </PageContainer>
  )
}
