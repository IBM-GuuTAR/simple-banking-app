import { Stack, styled } from '@mui/material'

export const PageContainer = styled(Stack)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
  gap: theme.spacing(2),
}))

export const ContentContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
}))

export const TransactionContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}))
