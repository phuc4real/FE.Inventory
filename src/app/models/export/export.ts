import { BaseResponse } from '..';

export interface Export {
  id: number;
  description: string;
  status: string;
  exportFor: string;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  isInactive: boolean;
  iInactiveAt: Date;
  inactiveBy: string;
}

export interface ExportObject extends BaseResponse {
  data: Export;
}

export interface Exports extends BaseResponse {
  data: Export[];
}
