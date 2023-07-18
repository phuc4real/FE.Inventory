import { Export, Item, User } from '.';

export interface UsingItem {
  export: Export;
  item: Item;
  quantity: number;
  forUser: User;
}

export interface UsingItemPagination {
  data: UsingItem[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalRecords: number;
}
