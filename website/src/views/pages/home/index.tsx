'use client'

import { useMemo } from 'react'
import { Container, Stack, Typography } from '@mui/material'

import { TransactionData } from '@/types'

import { useAppData } from '@/providers/AppDataProvider'

import Redirect from '@/views/components/core/Redirect'
import CoreButton from '@/views/components/core/CoreButton'

import BalanceCard from '@/views/components/common/BalanceCard'

import { ContentContainer, PageContainer, TransactionContainer } from './style'

export default function Homepage() {
  const { selectedAccount, accounts, transactions } = useAppData()

  const accountTransactions: TransactionData[] = useMemo(() => {
    if (!selectedAccount) return []
    return transactions
      .filter((tx) => tx.senderId === selectedAccount.id || tx.receiverId === selectedAccount.id)
      .sort((left, right) => right.timestamp - left.timestamp)
  }, [selectedAccount, transactions])

  if (!selectedAccount) return <Redirect path="/login" />
  return (
    <Container>
      <PageContainer>
        <BalanceCard />
        <Stack>
          <CoreButton variant="contained" path="/tranfer" fullWidth>
            Tranfer Money
          </CoreButton>
        </Stack>
        <ContentContainer>
          <Typography variant="h6">Transaction History</Typography>
          <Stack gap={2}>
            {accountTransactions.length > 0 ? (
              accountTransactions.map((tx) => (
                <Stack key={tx.id}>
                  <TransactionContainer>
                    <Typography variant="body1">
                      {tx.senderId === selectedAccount.id ? 'Tranfer' : 'Receive'}
                    </Typography>
                    <Typography variant="body1">
                      {tx.senderId === selectedAccount.id ? '-' : '+'} ฿ {tx.amount}
                    </Typography>
                  </TransactionContainer>
                  <Typography variant="body1">
                    {tx.senderId === selectedAccount.id ? 'to' : 'from'}{' '}
                    {tx.senderId === selectedAccount.id
                      ? (accounts.find((acc) => acc.id === tx.receiverId)?.displayName ?? 'Unknow')
                      : (accounts.find((acc) => acc.id === tx.senderId)?.displayName ?? 'Unknow')}
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
