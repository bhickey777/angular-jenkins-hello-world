export interface Trade {
  tradeId: number;
  clientId: number;
  instrumentId: number;
  ticker: string;
  name: string;
  tradeType: string;
  price:number;
  quantity: number;
  currency: string;
  tradeDate: string;
}