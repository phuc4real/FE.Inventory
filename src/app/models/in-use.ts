import { Pagination, User } from '.';

export interface InUse {
  exportId: number;
  itemId: string;
  code: string;
  name: string;
  imageUrl: string;
  quantity: number;
  forUser: User;
}

export interface InUsePagination extends Pagination {
  data: InUse[];
}
