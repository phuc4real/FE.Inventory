export interface Catalog {
  id: number;
  name: string;
}

export interface CatalogEdit {
  name: string;
}

export interface CatalogPagination {
  data: Catalog[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalRecords: number;
}
