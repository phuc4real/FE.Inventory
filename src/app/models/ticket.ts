import { Item, Pagination, TicketInfo, User } from './';

export interface Ticket {
  id: number;

  createdDate: Date;
  createdByUser: User;
  updatedDate: Date;
  updatedByUser: User;

  closeDate: Date;
}

export interface TicketWithHistory extends Ticket {
  history: TicketInfo[];
}

export interface TicketPagination extends Pagination {
  data: Ticket[];
}
