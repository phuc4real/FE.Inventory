import { BaseResponse } from './base-response';

export interface ChartData {
  month: string;
  value: number;
}

export interface ChartDataResponse extends BaseResponse {
  map(arg0: (x: any) => number): unknown;
  data: ChartData[];
}
