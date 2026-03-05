'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button, FormControl, Stack, Switch, TextField, Typography } from '@mui/material'

import { localStorageService } from '@/service/localStorageService'
import { incidentService } from '@/service/IncidentService'

import { useAppData } from '@/providers/AppDataProvider'

import { ManagerContentContainer } from './style'

export default function Manager() {
  const { setInstanaReportUrl, setInstanaEumKey, selectedAccount, insert100Transaction } = useAppData()

  const [reportUrlInput, setReportUrlInput] = useState<string>(localStorageService.getValue('instanaReportUrl') ?? '')
  const [eumKeyInput, setEumKeyInput] = useState<string>(localStorageService.getValue('instanaEumKey') ?? '')

  const [isLatencyEnabled, setIsLatencyEnabled] = useState<boolean>(false)

  const [isSetInstanaConfig, setIsSetInstanaConfig] = useState<boolean>(false)

  useEffect(() => {
    const initialize = async () => {
      const _isLatencyEnabled: boolean = await incidentService.fetchLatencyStatus()
      setIsLatencyEnabled(_isLatencyEnabled)
    }
    initialize()
  }, [])

  const handleToggleLatency = useCallback(async (target: boolean) => {
    const isSuccess: boolean = await incidentService.fetchToggleLatency()
    if (isSuccess) {
      setIsLatencyEnabled(target)
    }
  }, [])

  const handleTooManyTranfer = useCallback(async () => {
    if (!selectedAccount) return

    await insert100Transaction(selectedAccount.id)
  }, [insert100Transaction, selectedAccount])

  const handleLoadInstana = useCallback(() => {
    if (!reportUrlInput || !eumKeyInput) return

    setInstanaReportUrl(reportUrlInput)
    setInstanaEumKey(eumKeyInput)
    setIsSetInstanaConfig(true)

    localStorageService.setValue('instanaReportUrl', reportUrlInput)
    localStorageService.setValue('instanaEumKey', eumKeyInput)
  }, [setInstanaReportUrl, reportUrlInput, setInstanaEumKey, eumKeyInput])

  return (
    <ManagerContentContainer>
      <Typography variant="h4">{`"Simple Banking App" from Thailand!`}</Typography>
      <Typography variant="body1">Design for IBM Instana Observability for end-to-end monitoring</Typography>
      <Typography variant="h4">Application Manager</Typography>
      <Typography variant="body1">Please provide IBM Instana configuration to enable end user monitoring</Typography>
      <FormControl>
        <Typography variant="body2">IBM Instana Report URL</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={reportUrlInput}
          onChange={(e) => setReportUrlInput(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Typography variant="body2">IBM Instana EUM Key</Typography>
        <TextField
          variant="outlined"
          fullWidth
          type="password"
          value={eumKeyInput}
          onChange={(e) => setEumKeyInput(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleLoadInstana} disabled={isSetInstanaConfig}>
        Load Instana
      </Button>
      <Typography variant="h4">Incident Simulation</Typography>
      <Stack gap={1}>
        <Typography variant="h6">1. Add latency to backend API</Typography>
        <Stack direction="row" width={250} alignItems="center" gap={1}>
          <Typography variant="body2">Off</Typography>
          <Switch checked={isLatencyEnabled} onChange={(e) => handleToggleLatency(e.target.checked)} />
          <Typography variant="body2">On</Typography>
        </Stack>
      </Stack>
      <Stack gap={1}>
        <Typography variant="h6">2. Tranfer 1฿ x 100 times</Typography>
        <Stack width={250}>
          <Button variant="contained" disabled={!selectedAccount} onClick={handleTooManyTranfer}>
            Too many tranfer
          </Button>
        </Stack>
      </Stack>
    </ManagerContentContainer>
  )
}
