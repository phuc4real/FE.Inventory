import { ExportDetail, Item, User } from '.';

export interface ItemDetail extends Item {
  inStock: number;
  inUsing: number;
  isDeleted: boolean;

  createdDate: Date;
  createdByUser: User;
  updatedDate: Date;
  updatedByUser: User;

  exportDetails: ExportDetail[];
}
