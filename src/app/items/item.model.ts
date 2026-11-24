export type StockUrgency = 'STOCK_LOW' | 'STOCK_MEDIUM' | 'STOCK_HIGH'

export interface ItemOverview {
  id: string;
  name: string;
  price: number;
  amountOfStock: number;
  stockUrgency: StockUrgency;
}
