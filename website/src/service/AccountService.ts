import { AccountData } from '@/types'

import api from '@/config/axios'

class AccountService {
  public fetchAccount = async (): Promise<AccountData[]> => {
    const response = await api.get('/account')
    if (response.status === 200) return response.data as AccountData[]
    else return []
  }
}

export const accountService = new AccountService()
