export type AccountData = {
  id: number
  displayName: string
}

export type DisplayAccountData = {
  balance: number
  transactions: TransactionData[]
} & AccountData

export type TransactionInput = {
  senderId: number
  receiverId: number
  amount: number
  timestamp: number
}

export type TransactionData = {
  id: number
} & TransactionInput
