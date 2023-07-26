import { Decision, TicketDetail, UpdateTicketDetail } from '.';

export interface TicketInfo {
  id: number;
  purpose: string;
  title: string;
  description: string;
  status: string;

  leaderDecision: Decision;
  decision: Decision;

  createdAt: Date;
  closeAt: Date;
  details: TicketDetail[];
}

export interface UpdateTickerInfo {
  purpose: number;
  title: string;
  description: string;

  details: UpdateTicketDetail[];
}
