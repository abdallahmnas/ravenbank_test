export interface CollectionInterface {
  id?: number;
  accountNumber: string;
  sessionId: string;
  senderAccountNumber: string;
  senderAccountName: string;
  senderBankCode: string;
  senderBankName: string;
  senderFirstName: string;
  senderLastName: string;
  collectionDate: string;
  amount: number;
  narration?: string;
  responseData?: string;
  reference: string;
  userId?: number;
  transactionId?: number;
  created_at?: any;
  updated_at?: any;
}
