export interface WalletInterface {
  id?: number;
  balance: number;
  prevBalance: number;
  currency: string;
  status: string;
  userId: number;
  created_at?: any;
  updated_at?: any;
}
