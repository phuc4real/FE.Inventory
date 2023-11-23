import { ResponseMessage } from './response-message';

export interface BaseResponse {
  page: number;
  count: number;
  message: ResponseMessage;
}
