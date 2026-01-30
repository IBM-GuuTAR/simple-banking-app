'use client'

import { redirect, RedirectType, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Container, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { NumericFormat } from 'react-number-format'

import { AccountData } from '@/types'

import { useAppData } from '@/providers/AppDataProvider'

import CoreButton from '@/views/components/core/CoreButton'
import Redirect from '@/views/components/core/Redirect'

import BalanceCard from '@/views/components/common/BalanceCard'

import { ContentContainer, PageContainer, PageTitleContainer } from './style'

export default function TranferPage() {
  const router = useRouter()

  const { selectedAccount, accounts } = useAppData()

  const [userId, setUserId] = useState<string>()
  const [amount, setAmount] = useState<string>('0')

  const tranferableAccounts: AccountData[] = useMemo(
    () => accounts.filter((account) => account.id !== selectedAccount?.id),
    [accounts, selectedAccount],
  )

  const isTranferable: boolean = useMemo(
    () => userId !== undefined && tranferableAccounts.length > 0,
    [tranferableAccounts.length, userId],
  )

  // TODO: Connect Real API
  const handleTranfer = useCallback(() => {
    console.log(userId, Number(amount))

    redirect('/', RedirectType.push)
  }, [userId, amount])

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  useEffect(() => {
    const handleSetDefaultAccount = () => {
      if (tranferableAccounts.length) {
        setUserId(tranferableAccounts[0].id.toString())
      }
    }

    handleSetDefaultAccount()
  }, [tranferableAccounts])

  if (!selectedAccount) return <Redirect path="/login" />
  return (
    <Container>
      <PageContainer>
        <PageTitleContainer>
          <Stack width={70}>
            <CoreButton onClick={handleGoBack}>{`< Back`}</CoreButton>
          </Stack>
          <Typography variant="h6">Tranfer</Typography>
          <Stack width={70} />
        </PageTitleContainer>
        <BalanceCard />
        <ContentContainer>
          <Typography variant="h6">Tranfer to</Typography>
          {isTranferable ? (
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
                {tranferableAccounts.map((account) => (
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
                <CoreButton variant="contained" onClick={handleTranfer}>
                  Confirm Tranfer
                </CoreButton>
              </Stack>
            </Stack>
          ) : (
            <Typography variant="body1">Cannot process tranfer feature</Typography>
          )}
        </ContentContainer>
      </PageContainer>
    </Container>
  )
}
