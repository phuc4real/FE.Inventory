import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Export, Order, Receipt } from 'src/app/models';
import { ExportService, OrderService, ReceiptService } from 'src/app/services';
import { showError, toStringFormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'dashboard-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css'],
})
export class TabGroupComponent {
  orders!: Order[];
  exports!: Export[];
  receipts!: Receipt[];

  params: any = {
    pageIndex: 0,
    pageSize: 7,
    sortField: 'id',
    sortDirection: 'desc',
  };
  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private receiptService: ReceiptService,
    private exportService: ExportService
  ) {
    this.getListData();
  }

  getListData() {
    this.orderService.getPagination(this.params).subscribe(
      (response) => {
        this.orders = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );

    this.receiptService.getPagination(this.params).subscribe(
      (response) => {
        this.receipts = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );

    this.exportService.getPagination(this.params).subscribe(
      (response) => {
        this.exports = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  dateString(date: any) {
    return toStringFormatDate(date);
  }
}
