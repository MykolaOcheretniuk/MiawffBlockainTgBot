export interface CurrentPaymentInfo {
  toAddress: string | null;
  amount: number | null;
}
export interface Transaction {
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  signature: string;
}
export interface CompletedTransaction {
  transactionDate: number;
  senderAddress: string | null;
  receiverAddress: string;
  amount: number;
  transactionStatus: string;
  blockId: string | null;
}
export interface Alerts {
  completedTransactions: CompletedTransaction[];
}
