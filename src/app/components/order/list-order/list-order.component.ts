import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Order } from 'src/app/models';
import { OrderService } from 'src/app/services';
import { FormatDate, IsDefaultDate, showError } from 'src/app/share/helpers';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent {
  orders = new MatTableDataSource<Order>();
  displayedColumns: string[] = [
    'orderId',
    'status',
    'description',
    'isCompleted',
    'completeDate',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
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
  ) {}

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
            pageIndex: this.paginator?.pageIndex,
            pageSize: this.paginator?.pageSize,
            sortField: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.orderService
            .getOrders(params)
            .pipe(catchError(() => of(null)));
        }),
        map((response) => {
          if (response == null) return [];
          this.totalOrder = response.count;
          return response.data;
        })
      )
      .subscribe(
        (response) => {
          this.orders = new MatTableDataSource<Order>(response);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.orders = new MatTableDataSource<Order>([]);
        }
      );
  }

  dateString(date: any) {
    return IsDefaultDate(date) ? 'Not Complete' : FormatDate(date);
  }

  // cancelOrder(id: number) {
  //   this.orderService.cancel(id).subscribe(
  //     (response) => {
  //       showMessage(response, this.toastr);
  //       this.paginator._changePageSize(this.paginator.pageSize);
  //     },
  //     (err: any) => showError(err, this.toastr)
  //   );
  // }
}
