import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { Order } from 'src/app/models';
import { OrderService } from 'src/app/services';
import { FormatDate, showError, showMessage } from 'src/app/share/helpers';

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
          this.orders = new MatTableDataSource<Order>(response);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.orders = new MatTableDataSource<Order>([]);
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

  // getUserNameData(createdBy: string, updatedBy: string) {
  //   if (createdBy != null) {
  //     this.userServce.getUserInfoById(createdBy).subscribe((response) => {
  //       this.itemForm.patchValue({
  //         createdBy: response.data.userName,
  //       });
  //     });
  //   }
  //   if (updatedBy != null) {
  //     this.userServce.getUserInfoById(updatedBy).subscribe((response) => {
  //       this.itemForm.patchValue({
  //         updatedBy: response.data.userName,
  //       });
  //     });
  //   }
  // }

  formattedDate = (date: Date) => {
    return FormatDate(date);
  };
}
