import { BaseResponse, RecordHistory } from '..';

export interface TicketRecord {
  ticketId: number;
  recordId: number;

  ticketType: string;
  title: string;
  description: string;
  status: string;

  isClosed: boolean;
  closeDate: Date;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface TicketRecordObject extends BaseResponse {
  data: TicketRecord;
  history: RecordHistory[];
}

export interface TicketRecords extends BaseResponse {
  data: TicketRecord[];
}
