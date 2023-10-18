export interface OrderEntryUpdate {
  id: number;
  recordId: number;
  itemId: number;
  quantity: number;
  minPrice: number;
  maxPrice: number;
  note: string;
}
