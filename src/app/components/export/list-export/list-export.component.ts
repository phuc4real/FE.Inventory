import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Export, Operation, StatusCheck } from 'src/app/models';
import { ExportService } from 'src/app/services';
import { getOperation, showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-list-export',
  templateUrl: './list-export.component.html',
  styleUrls: ['./list-export.component.css'],
})
export class ListExportComponent {
  operation!: Operation;

  exports = new MatTableDataSource<Export>();
  displayedColumns: string[] = [
    'id',
    'description',
    'status',
    'exportFor',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchValue: string = '';
  totalRecords!: number;

  constructor(
    private exportService: ExportService,
    private toastr: ToastrService
  ) {
    this.operation = getOperation();
  }

  ngAfterViewInit() {
    this.exports.paginator = this.paginator;
    this.getPaginator();
    this.exports.sort = this.sort;
  }

  refreshData() {
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
          return this.exportService
            .getExports(params)
            .pipe(catchError(() => of(null)));
        }),
        map((response) => {
          if (response == null) return [];
          this.totalRecords = response.count;
          return response.data;
        })
      )
      .subscribe(
        (response) => {
          this.exports = new MatTableDataSource<Export>(response);
        },
        (error: any) => {
          showError(error, this.toastr);
          this.exports = new MatTableDataSource<Export>([]);
        }
      );
  }

  updateStatus(id: number) {
    this.exportService.updateStatus(id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.refreshData();
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
