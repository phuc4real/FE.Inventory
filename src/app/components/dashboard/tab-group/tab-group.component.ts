import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Export, OrderRecord } from 'src/app/models';
import { ExportService, OrderService } from 'src/app/services';
import { FormatDate, showError } from 'src/app/share/helpers';

@Component({
  selector: 'dashboard-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css'],
})
export class TabGroupComponent {
  orders: OrderRecord[] = [];
  exports: Export[] = [];

  params: any = {
    index: 0,
    size: 10,
    sort: 'updatedAt',
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
    this.orderService.getOrders(this.params).subscribe(
      (response) => {
        this.orders = response ? response.data : [];
      },
      (err: any) => showError(err, this.toastr)
    );

    this.exportService.getExports(this.params).subscribe(
      (response) => {
        this.exports = response ? response.data : [];
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  formattedDate = (date: Date) => {
    return FormatDate(date);
  };
}
