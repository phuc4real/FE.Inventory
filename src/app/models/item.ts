import { Catalog } from './catalog';
import { User } from './user';

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

export interface ItemEditDTO {
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
