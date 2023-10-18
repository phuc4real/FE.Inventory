import { BaseResponse, Category } from '..';

export interface Item {
  id: number;
  code: string;
  name: string;
  description: string;
  ImageUrl: string;
  Unit: number;
  UseUnit: number;
  Category: Category;

  CreatedAt: Date;
  CreatedBy: string;
  UpdatedAt: Date;
  UpdatedBy: string;
  IsInactive: boolean;
  InactiveAt: Date;
  InactiveBy: string;
}

export interface ItemObject extends BaseResponse {
  data: Item;
}

export interface Items extends BaseResponse {
  data: Item[];
}
