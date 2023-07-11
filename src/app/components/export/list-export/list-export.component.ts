import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-export',
  templateUrl: './list-export.component.html',
  styleUrls: ['./list-export.component.css'],
})
export class ListExportComponent {
  // exports = new MatTableDataSource<Order>();
  // displayedColumns: string[] = [
  //   'id',
  //   'orderDate',
  //   'status',
  //   'orderTotal',
  //   'orderByUser',
  //   'completeDate',
  //   'actions',
  // ];
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // pageSizeOptions: number[] = [10, 20, 50, 100];
  // searchValue: string = '';
  // listOrder!: Order[];
  // totalOrder!: number;
  // constructor(
  //   private orderService: OrderService,
  //   private toastr: ToastrService
  // ) {}
}
