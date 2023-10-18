import { BaseResponse } from '..';

export interface Export {
  id: number;
  description: string;
  status: string;
  exportFor: string;

  CreatedAt: Date;
  CreatedBy: string;
  UpdatedAt: Date;
  UpdatedBy: string;
  IsInactive: boolean;
  InactiveAt: Date;
  InactiveBy: string;
}

export interface ExportObject extends BaseResponse {
  data: Export;
}

export interface Exports extends BaseResponse {
  data: Export[];
}
