import { BaseResponse } from '..';

export interface ItemCompact {
  id: number;
  code: string;
  name: string;
  imageUrl: string;
}
export interface ItemCompactObject extends BaseResponse {
  data: ItemCompact;
}
