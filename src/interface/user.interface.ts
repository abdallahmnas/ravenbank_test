export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  pin?: string;
  state?: string;
  lga?: string;
  gender: "male" | "female";
  status: string;
  verified: boolean;
  created_at?: any;
  updated_at?: any;
}
