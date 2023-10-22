import { BaseResponse } from '..';

export interface Ticket {
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

export interface TicketObject extends BaseResponse {
  data: Ticket;
}

export interface Tickets extends BaseResponse {
  data: Ticket[];
}
