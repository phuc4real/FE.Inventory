import { BaseResponse } from '..';

export interface Order {
  orderId: number;
  recordId: number;

  status: string;
  description: string;
  isCompleted: boolean;
  completeDate: Date;

  CreatedAt: Date;
  CreatedBy: string;
  UpdatedAt: Date;
  UpdatedBy: string;
}

export interface OrderObject extends BaseResponse {
  data: Order;
}

export interface Orders extends BaseResponse {
  data: Order[];
}
