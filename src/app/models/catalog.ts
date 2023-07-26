import { Pagination } from '.';

export interface Catalog {
  id: number;
  name: string;
}

export interface UpdateCatalog {
  name: string;
}

export interface CatalogPagination extends Pagination {
  data: Catalog[];
}
