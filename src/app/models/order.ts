import { Item } from './item';
import { User } from './user';

export interface OrderDetail {
  item: Item;
  quantity: number;
  price: number;
  total: number;
}

export interface AddOrderDetail {
  itemId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  orderTotal: number;
  orderDate: Date;
  status: string;
  orderByUser: User;
  completeDate: Date;
  details: OrderDetail[];
}

export interface OrderPagination {
  data: Order[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalRecords: number;
}

export interface AddOrder {
  orderTotal: number;
  details: AddOrderDetail[];
}
