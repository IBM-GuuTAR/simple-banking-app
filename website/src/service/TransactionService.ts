import { TransactionData, TransactionInput } from '@/types'

import api from '@/config/axios'

class TransactionService {
  public fetchTransaction = async (): Promise<TransactionData[]> => {
    const response = await api.get('/transaction')
    if (response.status === 200) return response.data as TransactionData[]
    else return []
  }

  public insertTransaction = async (transactionInput: TransactionInput): Promise<boolean> => {
    const response = await api.post('/transaction', transactionInput)
    if (response.status === 201) return true
    else return false
  }

  public insert100Transaction = async (senderId: number): Promise<boolean> => {
    const promises = Array.from({ length: 100 }, () =>
      api.post('/transaction', { senderId, receiverId: 1, amount: 1, timestamp: Math.floor(Date.now() / 1000) }),
    )

    await Promise.all(promises)
    return true
  }
}

export const transactionService = new TransactionService()
