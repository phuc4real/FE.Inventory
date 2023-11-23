import { BaseResponse, RecordHistory } from '..';

export interface OrderRecord {
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

export interface OrderRecordObject extends BaseResponse {
  data: OrderRecord;
  history: RecordHistory[];
}

export interface OrderRecords extends BaseResponse {
  data: OrderRecord[];
}
