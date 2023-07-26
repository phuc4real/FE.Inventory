import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Export, Order } from 'src/app/models';
import { ExportService, OrderService } from 'src/app/services';
import { showError, toStringFormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'dashboard-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css'],
})
export class TabGroupComponent {
  orders: Order[] = [];
  exports: Export[] = [];

  params: any = {
    pageIndex: 0,
    pageSize: 7,
    sortField: 'id',
    sortDirection: 'desc',
  };
  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private exportService: ExportService
  ) {
    this.getListData();
  }

  getListData() {
    this.orderService.getPagination(this.params).subscribe(
      (response) => {
        this.orders = response ? response.data : [];
      },
      (err: any) => showError(err, this.toastr)
    );

    this.exportService.getPagination(this.params).subscribe(
      (response) => {
        this.exports = response ? response.data : [];
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  dateString(date: any) {
    return toStringFormatDate(date);
  }
}
