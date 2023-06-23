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
