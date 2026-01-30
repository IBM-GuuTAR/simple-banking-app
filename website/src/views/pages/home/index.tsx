'use client'

import { Container, Stack, Typography } from '@mui/material'

import { useAppData } from '@/providers/AppDataProvider'

import Redirect from '@/views/components/core/Redirect'
import CoreButton from '@/views/components/core/CoreButton'

import BalanceCard from '@/views/components/common/BalanceCard'

import { ContentContainer, PageContainer, TransactionContainer } from './style'

export default function Homepage() {
  const { selectedAccount, displayAccounts } = useAppData()

  if (!selectedAccount) return <Redirect path="/login" />
  return (
    <Container>
      <PageContainer>
        <BalanceCard />
        <Stack>
          <CoreButton variant="contained" path="/transfer" fullWidth>
            Transfer Money
          </CoreButton>
        </Stack>
        <ContentContainer>
          <Typography variant="h6">Transaction History</Typography>
          <Stack gap={2}>
            {selectedAccount.transactions.length > 0 ? (
              selectedAccount.transactions.map((tx) => (
                <Stack key={tx.id}>
                  <TransactionContainer>
                    <Typography variant="body1">
                      {tx.senderId === selectedAccount.id ? 'Transfer' : 'Receive'}
                    </Typography>
                    <Typography variant="body1">
                      {tx.senderId === selectedAccount.id ? '-' : '+'} ฿ {tx.amount}
                    </Typography>
                  </TransactionContainer>
                  <Typography variant="body1">
                    {tx.senderId === selectedAccount.id ? 'to' : 'from'}{' '}
                    {tx.senderId === selectedAccount.id
                      ? (displayAccounts.find((account) => account.id === tx.receiverId)?.displayName ?? 'Unknow')
                      : (displayAccounts.find((account) => account.id === tx.senderId)?.displayName ?? 'Unknow')}
                  </Typography>
                </Stack>
              ))
            ) : (
              <Typography variant="body1">No transaction data</Typography>
            )}
          </Stack>
        </ContentContainer>
      </PageContainer>
    </Container>
  )
}
