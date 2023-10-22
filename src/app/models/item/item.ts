import { BaseResponse, Category } from '..';

export interface Item {
  id: number;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  unit: number;
  useUnit: number;
  category: Category;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  isInactive: boolean;
  inactiveAt: Date;
  inactiveBy: string;
}

export interface ItemObject extends BaseResponse {
  data: Item;
}

export interface Items extends BaseResponse {
  data: Item[];
}
