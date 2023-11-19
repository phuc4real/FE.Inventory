import { BaseResponse, ItemCompact } from '..';

export interface OrderEntry {
  id: number;
  recordId: number;
  item: ItemCompact;
  quantity: number;
  minPrice: number;
  maxPrice: number;
  note: string;
  minTotal: number;
  maxTotal: number;
}

export interface OrderEntries extends BaseResponse {
  data: OrderEntry[];
  description: string;
}
