
export interface Transaction {
  id: string;
  amount: number;
  senderemail: string;
  receiveremail: string;
  timestamp: string;
}

export interface CreateTransactionRequest {
  senderemail: string;
  receiveremail: string;
  amount: number;
}
