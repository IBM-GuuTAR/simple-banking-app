import { createTheme, Theme } from '@mui/material'

import { PALETTE } from './palette'
import { TYPOGRAPHY } from './typography'

export const theme: Theme = createTheme({
  palette: PALETTE,
  typography: TYPOGRAPHY,
})

theme.components = {
  ...theme.components,
}
