import { BaseResponse, CommentResponse, RecordHistory } from '..';

export interface TicketRecord {
  ticketId: number;
  recordId: number;

  ticketType: string;
  ticketTypeId: number;
  title: string;
  description: string;
  status: string;

  isClosed: boolean;
  closeDate: Date;

  comment: CommentResponse;

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
