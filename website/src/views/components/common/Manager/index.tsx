'use client'

import { useCallback, useState } from 'react'
import { Button, FormControl, Stack, TextField, Typography } from '@mui/material'

import { useAppData } from '@/providers/AppDataProvider'

import { ManagerContentContainer } from './style'

export default function Manager() {
  const { setInstanaReportUrl, setInstanaEumKey } = useAppData()

  const [reportUrlInput, setReportUrlInput] = useState<string>('')
  const [eumKeyInput, setEumKeyInput] = useState<string>('')

  const [isSetInstanaConfig, setIsSetInstanaConfig] = useState<boolean>(false)

  const loadInstana = useCallback(() => {
    if (!reportUrlInput || !eumKeyInput) return

    setInstanaReportUrl(reportUrlInput)
    setInstanaEumKey(eumKeyInput)
    setIsSetInstanaConfig(true)
  }, [setInstanaReportUrl, reportUrlInput, setInstanaEumKey, eumKeyInput])

  return (
    <ManagerContentContainer>
      <Typography variant="h4">Manager</Typography>
      <FormControl>
        <Typography variant="body1">IBM Instana Report URL</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={reportUrlInput}
          onChange={(e) => setReportUrlInput(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Stack gap={1}>
          <Typography variant="body1">IBM Instana EUM Key</Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            value={eumKeyInput}
            onChange={(e) => setEumKeyInput(e.target.value)}
          />
        </Stack>
      </FormControl>
      <Button variant="contained" color="primary" onClick={loadInstana} disabled={isSetInstanaConfig}>
        Load Instana
      </Button>
    </ManagerContentContainer>
  )
}
