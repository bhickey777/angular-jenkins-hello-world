export interface OrderRequest {
  ticker: string;
  quantity: number;
  price: number;
  side: string;
  instrumentType: string;
}