import { Item, User } from '.';

export interface ReceiptDetail {
  item: Item;
  quantity: number;
}

export interface AddReceiptDetail {
  itemId: string;
  quantity: number;
}

export interface Receipt {
  id: number;
  itemCount: number;
  createdDate: Date;
  createdByUser: User;
  details: ReceiptDetail[];
}

export interface ReceiptPagination {
  data: Receipt[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalRecords: number;
}

export interface AddRecipt {
  itemCount: number;
  details: AddReceiptDetail[];
}
