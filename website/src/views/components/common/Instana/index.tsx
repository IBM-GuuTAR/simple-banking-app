/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { useAppData } from '@/providers/AppDataProvider'

declare global {
  interface Window {
    ineum?: any
    InstanaEumObject?: any
  }
}

export default function Instana() {
  const { instanaReportUrl, instanaEumKey, selectedAccount } = useAppData()

  useEffect(() => {
    if (!instanaReportUrl || !instanaEumKey) return
    if (window.ineum) return

    console.log('Initializing Instana EUM...')

    const instanaStan = (s: any, t: any, a: any, n?: any) => {
      if (!s[t]) {
        s[t] = a
        n = s[a] = function (...args: any) {
          n.q.push(args)
        }
        n.q = []
        n.v = 2
        n.l = Date.now()
      }
    }

    instanaStan(window, 'InstanaEumObject', 'ineum')
    window.ineum('reportingUrl', instanaReportUrl)
    window.ineum('key', instanaEumKey)
    window.ineum('trackSessions')
    window.ineum('autoPageDetection', true)

    if (selectedAccount) {
      window.ineum('user', selectedAccount.id, selectedAccount.displayName)
    }

    const script = document.createElement('script')
    script.src = 'https://eum.instana.io/1.8.1/eum.min.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    document.head.appendChild(script)
  }, [instanaReportUrl, instanaEumKey, selectedAccount])

  return null
}
