import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AccountData, DisplayAccountData, TransactionData, TransactionInput } from '@/types'

import { accountService } from '@/service/AccountService'
import { transactionService } from '@/service/TransactionService'

export type AppDataContextType = {
  selectedAccount?: DisplayAccountData
  selectUser: (accountId: number) => void
  displayAccounts: DisplayAccountData[]
  insertTransaction: (transactionInput: TransactionInput) => void
  instanaReportUrl: string
  setInstanaReportUrl: (url: string) => void
  instanaEumKey: string
  setInstanaEumKey: (key: string) => void
  isDataLoaded: boolean
}

const AppDataContext = createContext<AppDataContextType>({} as AppDataContextType)

type Props = {
  children: ReactNode
}

export const AppDataProvider = ({ children }: Props) => {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const [displayAccounts, setDisplayAccounts] = useState<DisplayAccountData[]>([])
  const [selectedAccountId, setSelectedAccountId] = useState<number>()

  const [instanaReportUrl, setInstanaReportUrl] = useState<string>(process.env.NEXT_PUBLIC_INSTANA_REPORT_URL ?? '')
  const [instanaEumKey, setInstanaEumKey] = useState<string>(process.env.NEXT_PUBLIC_INSTANA_EUM_KEY ?? '')

  const selectedAccount: DisplayAccountData | undefined = useMemo(
    () => displayAccounts.find((account) => account.id === selectedAccountId),
    [displayAccounts, selectedAccountId],
  )

  useEffect(() => {
    const initialize = async () => {
      const _accounts: AccountData[] = await accountService.fetchAccount()
      const _transactions: TransactionData[] = await transactionService.fetchTransaction()

      const displayAccounts: DisplayAccountData[] = accountService.renderDisplayAccounts(
        _accounts.filter((account) => account.id !== 1),
        _transactions,
      )
      setDisplayAccounts(displayAccounts)

      setIsDataLoaded(true)
    }

    initialize()
  }, [])

  const fetchData = useCallback(async () => {
    const _accounts: AccountData[] = await accountService.fetchAccount()
    const _transactions: TransactionData[] = await transactionService.fetchTransaction()

    const displayAccounts: DisplayAccountData[] = accountService.renderDisplayAccounts(
      _accounts.filter((account) => account.id !== 1),
      _transactions,
    )
    setDisplayAccounts(displayAccounts)
  }, [])

  const selectUser = useCallback((accountId: number) => {
    setSelectedAccountId(accountId)
  }, [])

  const insertTransaction = useCallback(
    async (transactionInput: TransactionInput) => {
      await transactionService.insertTransaction(transactionInput)
      fetchData()
    },
    [fetchData],
  )

  return (
    <AppDataContext.Provider
      value={{
        selectedAccount,
        selectUser,
        displayAccounts,
        insertTransaction,
        instanaReportUrl,
        setInstanaReportUrl,
        instanaEumKey,
        setInstanaEumKey,
        isDataLoaded,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => useContext(AppDataContext)
