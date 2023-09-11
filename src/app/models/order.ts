import { OrderInfo, Pagination, User } from '.';

export interface Order {
  id: number;

  status: string;
  createdDate: Date;
  createdByUser: User;
  updatedDate: Date;
  updatedByUser: User;

  completeDate: Date;
}

export interface OrderWithHistory extends Order {
  history: OrderInfo[];
}

export interface OrderPagination extends Pagination {
  data: Order[];
}
