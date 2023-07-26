import { ExportDetail, Pagination, User } from '.';

export interface Export {
  id: number;
  description: string;
  status: string;
  forUser: User;

  createdDate: Date;
  createdByUser: User;
  updatedDate: Date;
  updatedByUser: User;

  details: ExportDetail[];
}

export interface ExportPagination extends Pagination {
  data: Export[];
}
