import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Item } from 'src/app/models';
import { ItemService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  data = new MatTableDataSource<Item>();
  displayedColumns: string[] = [
    'imageUrl',
    'code',
    'name',
    'category',
    'unit',
    'useUnit',
    'actions',
  ];
  sortColumn = 'code';
  pageSizeOptions: number[] = [10, 20, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchValue: string = '';
  total!: number;

  constructor(
    private itemService: ItemService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.getPaginator();
    this.data.sort = this.sort;
  }

  refreshData() {
    this.paginator.firstPage();
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  getPaginator() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          const params: any = {
            Index: this.paginator?.pageIndex,
            Size: this.paginator?.pageSize,
            Sort: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.itemService
            .getItems(params)
            .pipe(catchError(async (err) => showError(err, this.toastr)));
        }),
        map((response) => {
          if (response == null) return [];
          this.total = response.count;
          return response.data;
        })
      )
      .subscribe(
        (result) => {
          this.data = new MatTableDataSource<Item>(result);
        },
        (error) => {
          showError(error, this.toastr);
          this.data = new MatTableDataSource<Item>([]);
        }
      );
  }

  deleteItem(id: number) {
    this.itemService.delete(id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
