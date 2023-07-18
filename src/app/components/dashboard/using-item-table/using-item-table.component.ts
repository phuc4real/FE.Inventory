import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { UsingItem } from 'src/app/models';
import { UsingItemService } from 'src/app/services';
import { toStringFormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'app-using-item-table',
  templateUrl: './using-item-table.component.html',
  styleUrls: ['./using-item-table.component.css'],
})
export class UsingItemTableComponent {
  dataTable = new MatTableDataSource<UsingItem>();
  displayedColumns: string[] = [
    'itemName',
    'quantity',
    'export',
    'description',
    'forUser',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [5, 10, 15, 20];
  data!: UsingItem[];
  totalRecords!: number;

  constructor(private usingItemService: UsingItemService) {}

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
          };
          return this.usingItemService
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
          console.log(dto);
          this.setData(dto);
          console.log(dto);
        },
        (error: any) => {
          this.setData([]);
        }
      );
  }

  setData(data: any) {
    this.data = data;

    this.dataTable = new MatTableDataSource<UsingItem>(this.data);
    console.log(data);
  }

  dateString(date: any) {
    return toStringFormatDate(date);
  }
}
