export interface TransactionInterface {
  id?: number;
  description: string;
  accountName: string;
  reference: string;
  channelReference: string;
  channel: string; //e.g. "bank", "card", "wallet"
  amount: number;
  charges: number;
  netAmount: number;
  action: "debit" | "credit";
  remark: string;
  transactionType: string;
  userId: number;
  status: string;
  details: any;
  responseData: string; //Recieved from Profivder
  created_at?: any;
  updated_at?: any;
}
