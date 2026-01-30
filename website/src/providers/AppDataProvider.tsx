import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import { AccountData, TransactionData } from '@/types'

import { TRANSACTIONS_DATA_MOCK } from '@/data'

import { accountService } from '@/service/AccountService'

export type AppDataContextType = {
  selectedAccount?: AccountData
  selectUser: (account: AccountData) => void
  accounts: AccountData[]
  transactions: TransactionData[]
  isDataLoaded: boolean
}

const AppDataContext = createContext<AppDataContextType>({} as AppDataContextType)

type Props = {
  children: ReactNode
}

export const AppDataProvider = ({ children }: Props) => {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const [selectedAccount, setSelectedAccount] = useState<AccountData>()

  const [accounts, setAccounts] = useState<AccountData[]>([])
  const [transactions, setTransactions] = useState<TransactionData[]>([])

  useEffect(() => {
    const initialize = async () => {
      const _accounts = await accountService.fetchAccount()
      setAccounts(_accounts)
      setTransactions(TRANSACTIONS_DATA_MOCK)
      setIsDataLoaded(true)
    }

    initialize()
  }, [])

  const selectUser = useCallback((account: AccountData) => {
    setSelectedAccount(account)
  }, [])

  return (
    <AppDataContext.Provider value={{ selectedAccount, selectUser, accounts, transactions, isDataLoaded }}>
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => useContext(AppDataContext)
