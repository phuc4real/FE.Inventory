import { Item } from '.';

export interface TicketDetail {
  ticketInfoId: number;
  item: Item;
  quantity: number;
  type: string;
  note: string;
}

export interface UpdateTicketDetail {
  itemId: string;
  quantity: number;
  type: number;
  note: string;
}
