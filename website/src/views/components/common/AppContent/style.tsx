import { Stack, styled } from '@mui/material'

export const AppContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  maxWidth: 425,
  backgroundColor: theme.palette.background.default,
  overflow: 'scroll',
}))
