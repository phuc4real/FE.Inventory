import { OrderEntryUpdate } from '..';

export interface OrderUpdate {
  recordId: number;
  description: string;
  orderEntries: OrderEntryUpdate[];
}
