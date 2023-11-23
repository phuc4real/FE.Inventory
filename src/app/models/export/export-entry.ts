import { BaseResponse, ItemCompact } from '..';

export interface ExportEntry {
  id: number;
  exportId: number;
  item: ItemCompact;
  quantity: number;
  note: string;
}

export interface ExportEntries extends BaseResponse {
  data: ExportEntry[];
}
