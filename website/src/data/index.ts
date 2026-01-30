import dayjs from 'dayjs'

import { AccountData, TransactionData } from '@/types'

export const ACCOUNT_DATA_MOCK: AccountData[] = [
  {
    id: 0,
    displayName: 'Tony Stark',
  },
  {
    id: 1,
    displayName: 'Peter Parker',
  },
  {
    id: 2,
    displayName: 'Tar Richman',
  },
]

export const TRANSACTIONS_DATA_MOCK: TransactionData[] = [
  {
    id: 0,
    senderId: 0,
    receiverId: 1,
    amount: 10_000,
    timestamp: dayjs().subtract(1, 'minute').unix(),
  },
  {
    id: 1,
    senderId: 1,
    receiverId: 0,
    amount: 10_000,
    timestamp: dayjs().unix(),
  },
]
