import { Item, User } from './';

export interface TicketDetail {
  item: Item;
  quantity: number;
  type: string;
}

export interface AddTicketDetail {
  itemId: string;
  quantity: number;
  type: number;
}

export interface Ticket {
  id: string;
  purpose: string;
  title: string;
  description: string;
  leaderApprove: string;
  status: string;
  rejectReason: string;

  isClosed: boolean;
  closedDate: Date;

  createdDate: Date;
  createdByUser: User;
  lastModifiedDate: Date;
  modifiedByUser: User;

  details: TicketDetail[];
}

export interface TicketPagination {
  data: Ticket[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalRecords: number;
}

export interface AddTicket {
  purpose: number;
  title: string;
  description: string;

  details: AddTicketDetail[];
}
