import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, map } from 'rxjs';
import { ItemHolder, Operation } from 'src/app/models';
import { ItemService } from 'src/app/services';
import { showError, FormatDate, getOperation } from 'src/app/share/helpers';

@Component({
  selector: 'app-item-holder',
  templateUrl: './item-holder.component.html',
  styleUrls: ['./item-holder.component.css'],
})
export class ItemHolderComponent {
  operation!: Operation;
  dataTable = new MatTableDataSource<ItemHolder>();
  displayedColumns: string[] = [
    'itemImage',
    'itemCode',
    'itemName',
    'categoryName',
    'fullName',
    'email',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchValue: string = '';
  data!: ItemHolder[];
  totalRecords!: number;

  constructor(private itemService: ItemService, private toastr: ToastrService) {
    this.operation = getOperation();
    if (this.operation.itemHolder.canEdit)
      this.displayedColumns = this.displayedColumns.concat('actions');
  }

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
            index: this.paginator?.pageIndex,
            size: this.paginator?.pageSize,
            sort: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.itemService
            .getItemHolders(params)
            .pipe(catchError(async (err) => showError(err, this.toastr)));
        }),
        map((response) => {
          if (response == null) return [];
          this.totalRecords = response.count;
          return response.data;
        })
      )
      .subscribe(
        (response) => {
          this.data = response;
          this.dataTable = new MatTableDataSource<ItemHolder>(this.data);
        },
        (error: any) => {
          this.data = [];
          this.dataTable = new MatTableDataSource<ItemHolder>(this.data);
          showError(error, this.toastr);
        }
      );
  }

  formattedDate(date: any) {
    return FormatDate(date);
  }
}
