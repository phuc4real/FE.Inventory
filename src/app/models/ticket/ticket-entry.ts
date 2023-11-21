import { BaseResponse, ItemCompact } from '..';

export interface TicketEntry {
  id: number;
  recordId: number;
  item: ItemCompact;
  quantity: number;
  note: string;
}

export interface TicketEntries extends BaseResponse {
  data: TicketEntry[];
}
