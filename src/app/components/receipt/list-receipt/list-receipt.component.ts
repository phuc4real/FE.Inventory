import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Export, Receipt } from 'src/app/models';
import { ReceiptService } from 'src/app/services';
import {
  toStringFormatDate,
  showMessage,
  showError,
} from 'src/app/share/helpers';

@Component({
  selector: 'app-list-receipt',
  templateUrl: './list-receipt.component.html',
  styleUrls: ['./list-receipt.component.css'],
})
export class ListReceiptComponent {
  dataTable = new MatTableDataSource<Receipt>();
  displayedColumns: string[] = [
    'id',
    'itemCount',
    'createdDate',
    'createdByUser',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchValue: string = '';
  data!: Receipt[];
  totalRecords!: number;

  constructor(
    private recieptService: ReceiptService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator;
    this.getPaginator();
    this.dataTable.sort = this.sort;
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
          return this.recieptService
            .getPagination(params)
            .pipe(catchError(() => of(null)));
        }),
        map((dto) => {
          if (dto == null) return [];
          this.totalRecords = dto.totalRecords;
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

  setData(exports: any) {
    this.data = exports;
    this.dataTable = new MatTableDataSource<Receipt>(this.data);
  }

  dateString(date: any) {
    return toStringFormatDate(date);
  }
}
