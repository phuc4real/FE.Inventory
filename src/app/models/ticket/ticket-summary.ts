import { BaseResponse } from '..';

export interface TicketSummary {
  review: number;
  pending: number;
  processing: number;
  done: number;
}

export interface TicketSummaryObject extends BaseResponse {
  data: TicketSummary;
}
