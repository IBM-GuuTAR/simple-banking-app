import { AccountData, DisplayAccountData, TransactionData } from '@/types'

import api from '@/config/axios'

class AccountService {
  public fetchAccount = async (): Promise<AccountData[]> => {
    const response = await api.get('/account')
    if (response.status === 200) return response.data as AccountData[]
    else return []
  }

  public renderDisplayAccounts = (accounts: AccountData[], transactions: TransactionData[]): DisplayAccountData[] => {
    const displayAccounts: DisplayAccountData[] = accounts.map((account) => {
      const accountTransaction: TransactionData[] = transactions
        .filter((tx) => tx.senderId === account.id || tx.receiverId === account.id)
        .sort((left, right) => right.timestamp - left.timestamp)

      return {
        ...account,
        balance: accountTransaction.reduce(
          (prev, curr) => (curr.receiverId === account.id ? prev + curr.amount : prev - curr.amount),
          0,
        ),
        transactions: accountTransaction,
      }
    })

    return displayAccounts
  }
}

export const accountService = new AccountService()
