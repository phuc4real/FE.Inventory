import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Export } from 'src/app/models';
import { ExportService } from 'src/app/services';

@Component({
  selector: 'app-list-export',
  templateUrl: './list-export.component.html',
  styleUrls: ['./list-export.component.css'],
})
export class ListExportComponent {
  exports = new MatTableDataSource<Export>();
  displayedColumns: string[] = [
    'id',
    'description',
    'status',
    'forUser',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchValue: string = '';
  list!: Export[];
  totalRecords!: number;

  constructor(
    private exportService: ExportService,
    private toastr: ToastrService
  ) {}

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
            pageIndex: this.paginator?.pageIndex,
            pageSize: this.paginator?.pageSize,
            sortField: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.exportService
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
          this.list = dto;
          this.exports = new MatTableDataSource<Export>(this.list);
        },
        (error: any) => {
          this.list = [];
          this.exports = new MatTableDataSource<Export>(this.list);
        }
      );
  }
}
