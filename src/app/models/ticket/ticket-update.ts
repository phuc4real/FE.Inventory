import { TicketEntryUpdate } from '..';

export interface TicketUpdate {
  recordId: number;
  ticketTypeId: number;
  title: string;
  description: string;
  ticketEntries: TicketEntryUpdate[];
}
