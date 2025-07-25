export interface TransferInterface {
  id?: number;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  amount: number;
  narration: string;
  reference: string;
  status: string;
  userId: number;
  created_at?: any;
  updated_at?: any;
}
