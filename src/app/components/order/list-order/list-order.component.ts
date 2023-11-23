import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { Operation, OrderRecord } from 'src/app/models';
import { OrderService } from 'src/app/services';
import {
  FormatDate,
  getOperation,
  showError,
  showMessage,
} from 'src/app/share/helpers';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent {
  operation!: Operation;
  orders = new MatTableDataSource<OrderRecord>();
  displayedColumns: string[] = [
    'orderId',
    'status',
    'createdAt',
    'updatedAt',
    'description',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  searchValue: string = '';
  totalOrder!: number;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.operation = getOperation();
  }

  ngAfterViewInit() {
    this.orders.paginator = this.paginator;
    this.getPaginator();
    this.orders.sort = this.sort;
  }

  matSortChange() {
    this.applyFilter();
  }

  applyFilter() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.paginator.firstPage();
  }

  getPaginator() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          const params: any = {
            index: this.paginator?.pageIndex,
            size: this.paginator?.pageSize,
            sort: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.orderService
            .getOrders(params)
            .pipe(catchError(async (err) => showError(err, this.toastr)));
        }),
        map((response) => {
          if (response == null) return [];
          this.totalOrder = response.count;
          return response.data;
        })
      )
      .subscribe(
        (response) => {
          this.orders = new MatTableDataSource<OrderRecord>(response);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.orders = new MatTableDataSource<OrderRecord>([]);
        }
      );
  }

  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  formattedDate = (date: Date) => {
    return FormatDate(date);
  };
}
