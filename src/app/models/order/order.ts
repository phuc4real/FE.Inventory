import { BaseResponse } from '..';

export interface Order {
  orderId: number;
  recordId: number;

  status: string;
  description: string;
  isCompleted: boolean;
  completeDate: Date;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface OrderObject extends BaseResponse {
  data: Order;
}

export interface Orders extends BaseResponse {
  data: Order[];
}
