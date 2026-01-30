export type AccountData = {
  id: number
  displayName: string
  balance: number
}

export type TransactionData = {
  id: number
  senderId: number
  receiverId: number
  amount: number
  timestamp: number
}
