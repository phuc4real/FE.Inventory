import { BaseResponse } from '..';

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryObject extends BaseResponse {
  data: Category;
}

export interface Categories extends BaseResponse {
  data: Category[];
}
