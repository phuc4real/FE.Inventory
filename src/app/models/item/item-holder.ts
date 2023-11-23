import { BaseResponse } from '..';

export interface ItemHolder {
  itemId: number;
  itemCode: string;
  itemName: string;
  itemImageUrl: string;
  categoryId: number;
  categoryName: string;
  exportId: number;
  userName: string;
  email: string;
  fullName: string;
}

export interface ItemHolders extends BaseResponse {
  data: ItemHolder[];
}
