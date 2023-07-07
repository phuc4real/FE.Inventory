import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Order } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';
import { formatCurrency, formatDate } from '@angular/common';

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
    'user',
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

  matSortChange(e: any) {
    if (e.active != 'actions') this.applyFilter();
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
            .getPaginationOrder(params)
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
        (error: any) => {
          this.setData([]);
        }
      );
  }

  setData(orders: any) {
    this.listOrder = orders;
    this.orders = new MatTableDataSource<Order>(this.listOrder);
  }

  format(date: any) {
    return formatDate(date, 'hh:mm:ss - dd/MM/yyyy', 'en-US');
  }

  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(
      (response) => {
        if (response[0])
          this.toastr.success(response[0].value, response[0].key);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (errors: any) => {
        if (errors.error[0])
          this.toastr.error(errors.error[0].value, errors.error[0].key);
        else this.toastr.error('Something went wrong', 'Error');
      }
    );
  }
}
