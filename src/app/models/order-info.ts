import { OrderDetail, UpdateOrderDetail, Decision } from '.';

export interface OrderInfo {
  id: number;
  status: string;
  decision: Decision;
  createdAt: Date;
  minTotal: number;
  maxTotal: number;
  description: string;
  details: OrderDetail[];
}

export interface UpdateOrderInfo {
  minTotal: number;
  maxTotal: number;
  description: string;
  details: UpdateOrderDetail[];
}
