import { BaseResponse } from './base-response';

export interface ChartData {
  month: string;
  value: number;
}

export interface ChartDataResponse extends BaseResponse {
  data: ChartData[];
}
