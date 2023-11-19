import { BaseResponse } from '..';

export interface TicketSummary {
  pendingTicket: number;
  processingTicket: number;
  completedTicket: number;
  rejectTicket: number;
}

export interface TicketSummaryObject extends BaseResponse {
  data: TicketSummary;
}
