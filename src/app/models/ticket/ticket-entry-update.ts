export interface TicketEntryUpdate {
  id: number;
  recordId: number;
  itemId: number;
  quantity: number;
  note: string;
}
export interface TicketEntriesUpdate {
  data: TicketEntryUpdate[];
}
