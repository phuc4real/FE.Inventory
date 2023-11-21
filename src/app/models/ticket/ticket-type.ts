import { BaseResponse } from '../common/base-response';

export interface TicketType {
  id: number;
  description: string;
}
export interface TicketTypeList extends BaseResponse {
  data: TicketType[];
}
