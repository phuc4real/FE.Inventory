import { Item } from '.';

export interface OrderDetail {
  item: Item;
  quantity: number;
  minPrice: number;
  maxPrice: number;
  note: string;
  minTotal: number;
  maxTotal: number;
}

export interface UpdateOrderDetail {
  itemId: string;
  quantity: number;
  minPrice: number;
  maxPrice: number;
  note: string;
  minTotal: number;
  maxTotal: number;
}
