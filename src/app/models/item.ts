import { Catalog, User } from '.';

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  catalog: Catalog;
  inStock: number;
  used: number;
  createdDate: Date;
  createdByUser: User;
  lastModifiedDate: Date;
  modifiedByUser: User;
}

export interface ItemEdit {
  name: string;
  description: string;
  imageUrl: string;
  catalogId: number;
}

export interface ItemPagaination {
  data: Item[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalRecords: number;
}
