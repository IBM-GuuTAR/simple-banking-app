import { Stack, styled } from '@mui/material'

export const ContentContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
}))
