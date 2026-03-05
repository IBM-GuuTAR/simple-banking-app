import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AccountData, DisplayAccountData, TransactionData, TransactionInput } from '@/types'

import { accountService } from '@/service/AccountService'
import { transactionService } from '@/service/TransactionService'
import { localStorageService } from '@/service/localStorageService'

export type AppDataContextType = {
  selectedAccount?: DisplayAccountData
  selectUser: (accountId: number) => void
  displayAccounts: DisplayAccountData[]
  insertTransaction: (transactionInput: TransactionInput) => Promise<boolean>
  insert100Transaction: (senderId: number) => Promise<boolean>
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
      const selectedAccountId = localStorageService.getValue('selectedAccountId')
      if (selectedAccountId) {
        setSelectedAccountId(Number(selectedAccountId))
      }

      const instanaReportUrl = localStorageService.getValue('instanaReportUrl')
      setInstanaReportUrl(instanaReportUrl ?? '')

      const instanaEumKey = localStorageService.getValue('instanaEumKey')
      setInstanaEumKey(instanaEumKey ?? '')

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
    async (transactionInput: TransactionInput): Promise<boolean> => {
      const isFinished = await transactionService.insertTransaction(transactionInput)
      fetchData()
      return isFinished
    },
    [fetchData],
  )

  const insert100Transaction = useCallback(
    async (senderId: number): Promise<boolean> => {
      const isFinished = await transactionService.insert100Transaction(senderId)
      if (isFinished) {
        fetchData()
      }
      return isFinished
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
        insert100Transaction,
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
