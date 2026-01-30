import { Typography } from '@mui/material'

import { useAppData } from '@/providers/AppDataProvider'

import { ContentContainer } from './style'

export default function BalanceCard() {
  const { selectedAccount } = useAppData()

  if (!selectedAccount) return <></>
  return (
    <ContentContainer>
      <Typography variant="body1">Total Balance</Typography>
      <Typography variant="h5">฿ {selectedAccount.balance}</Typography>
    </ContentContainer>
  )
}
