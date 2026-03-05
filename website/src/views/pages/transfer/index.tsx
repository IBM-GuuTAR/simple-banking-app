'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Container, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'

import { AccountData } from '@/types'

import { useAppData } from '@/providers/AppDataProvider'

import CoreButton from '@/views/components/core/CoreButton'
import Redirect from '@/views/components/core/Redirect'

import BalanceCard from '@/views/components/common/BalanceCard'

import { ContentContainer, PageContainer, PageTitleContainer } from './style'

export default function TransferPage() {
  const router = useRouter()

  const { selectedAccount, displayAccounts, insertTransaction } = useAppData()

  const [userId, setUserId] = useState<string>()
  const [amount, setAmount] = useState<string>('0')

  const transferableAccounts: AccountData[] = useMemo(
    () => displayAccounts.filter((account) => account.id !== selectedAccount?.id),
    [displayAccounts, selectedAccount],
  )

  const isTransferable: boolean = useMemo(
    () => userId !== undefined && transferableAccounts.length > 0,
    [transferableAccounts.length, userId],
  )

  const handleTransfer = useCallback(async () => {
    const amountNumber: number = Number(amount.replaceAll(',', ''))

    if (!selectedAccount || !userId || amountNumber <= 0) return

    await insertTransaction({
      senderId: selectedAccount?.id,
      receiverId: Number(userId),
      amount: amountNumber,
      timestamp: dayjs().unix(),
    })

    if (window.ineum) {
      window.ineum('reportEvent', 'transfer completed')
    }

    router.push('/')
  }, [amount, selectedAccount, userId, insertTransaction, router])

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  useEffect(() => {
    const handleSetDefaultAccount = () => {
      if (transferableAccounts.length) {
        setUserId(transferableAccounts[0].id.toString())
      }
    }

    handleSetDefaultAccount()
  }, [transferableAccounts])

  useEffect(() => {
    if (window.ineum) {
      window.ineum('reportEvent', 'visit transfer page')
    }
  }, [])

  if (!selectedAccount) return <Redirect path="/login" />
  return (
    <Container>
      <PageContainer>
        <PageTitleContainer>
          <Stack width={70}>
            <CoreButton onClick={handleGoBack}>{`< Back`}</CoreButton>
          </Stack>
          <Typography variant="h6">Transfer</Typography>
          <Stack width={70} />
        </PageTitleContainer>
        <BalanceCard />
        <ContentContainer>
          <Typography variant="h6">Transfer to</Typography>
          {isTransferable ? (
            <Stack gap={2}>
              <TextField
                variant="standard"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
                select
              >
                {transferableAccounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.displayName}
                  </MenuItem>
                ))}
              </TextField>
              <NumericFormat
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                customInput={TextField}
                thousandSeparator
                valueIsNumericString
                variant="standard"
                label="Amount"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography variant="body1" color="text.primary">
                          ฿
                        </Typography>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Stack alignSelf="flex-end">
                <CoreButton variant="contained" onClick={handleTransfer}>
                  Confirm Transfer
                </CoreButton>
              </Stack>
            </Stack>
          ) : (
            <Typography variant="body1">Cannot process transfer feature</Typography>
          )}
        </ContentContainer>
      </PageContainer>
    </Container>
  )
}
