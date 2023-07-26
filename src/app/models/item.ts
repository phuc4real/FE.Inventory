import { Catalog, Pagination, User } from '.';

export interface Item {
  id: string;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  catalog: Catalog;
}

export interface UpdateItem {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  catalogId: number;
}

export interface ItemPagaination extends Pagination {
  data: Item[];
}
