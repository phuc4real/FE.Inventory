import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  items = new MatTableDataSource<Item>();
  displayedColumns: string[] = [
    'code',
    'name',
    'description',
    'catalog',
    'inStock',
    'inUse',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  searchValue: string = '';
  listItem!: Item[];
  totalItem!: number;

  constructor(
    private itemService: ItemService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.items.paginator = this.paginator;
    this.getPaginator();
    this.items.sort = this.sort;
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
            pageIndex: this.paginator?.pageIndex,
            pageSize: this.paginator?.pageSize,
            sortField: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.itemService
            .getPagination(params)
            .pipe(catchError(async (err) => showError(err, this.toastr)));
        }),
        map((dto) => {
          if (dto == null) return [];
          this.totalItem = dto.totalRecords;
          return dto.data;
        })
      )
      .subscribe(
        (dto) => {
          this.listItem = dto;
          this.items = new MatTableDataSource<Item>(this.listItem);
        },
        (error) => {
          this.listItem = [];
          this.items = new MatTableDataSource<Item>(this.listItem);
        }
      );
  }

  deleteItem(id: string) {
    this.itemService.delete(id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
