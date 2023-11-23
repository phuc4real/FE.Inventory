export interface Operation {
  item: ItemOperation;
  dashboard: DashboardOperation;
  category: CategoryOperation;
  order: OrderOperation;
  ticket: TicketOperation;
  export: ExportOperation;
  itemHolder: ItemHolderOperation;
}

export interface ItemOperation {
  canView: boolean;
  canEdit: boolean;
}

export interface DashboardOperation {
  canView: boolean;
}

export interface CategoryOperation {
  canView: boolean;
  canEdit: boolean;
}

export interface OrderOperation {
  canView: boolean;
  canEdit: boolean;
  canApproval: boolean;
}

export interface ExportOperation {
  canView: boolean;
  canEdit: boolean;
}

export interface TicketOperation {
  canView: boolean;
  canEdit: boolean;
  canChangeStatus: boolean;
  canApproval: boolean;
}

export interface ItemHolderOperation {
  canView: boolean;
  canEdit: boolean;
}
