import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Order } from 'src/app/models';
import { OrderService } from 'src/app/services';
import {
  isDefaultDate,
  toStringFormatDate,
  showError,
  showMessage,
} from 'src/app/share/helpers';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent {
  orders = new MatTableDataSource<Order>();
  displayedColumns: string[] = [
    'id',
    'orderDate',
    'status',
    'orderTotal',
    'orderByUser',
    'completeDate',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  searchValue: string = '';
  listOrder!: Order[];
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
            .getPagination(params)
            .pipe(catchError(() => of(null)));
        }),
        map((dto) => {
          if (dto == null) return [];
          this.totalOrder = dto.totalRecords;
          return dto.data;
        })
      )
      .subscribe(
        (dto) => {
          this.setData(dto);
        },
        (err: any) => {
          this.setData([]);
        }
      );
  }

  setData(orders: any) {
    this.listOrder = orders;
    this.orders = new MatTableDataSource<Order>(this.listOrder);
  }

  dateString(date: any) {
    return isDefaultDate(date) ? 'Not Complete' : toStringFormatDate(date);
  }

  cancelOrder(id: number) {
    this.orderService.cancel(id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
