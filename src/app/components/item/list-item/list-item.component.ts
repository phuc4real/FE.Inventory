import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Item } from 'src/app/models';
import { ItemService } from 'src/app/services';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  items = new MatTableDataSource<Item>();
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'catalog',
    'inStock',
    'used',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  searchValue: string = '';
  ListItem!: Item[];
  totalItem!: number;
  constructor(private itemService: ItemService) {}

  ngAfterViewInit() {
    this.items.paginator = this.paginator;
    this.getPaginator();
    this.items.sort = this.sort;
  }

  matSortChange(e: any) {
    if (e.active != 'actions') this.applyFilter();
  }

  applyFilter() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  onRowClick(row: any) {
    console.log(row);
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
          return this.getItems(params).pipe(catchError(() => of(null)));
        }),
        map((dto) => {
          if (dto == null) return [];
          this.totalItem = dto.totalRecords;
          return dto.data;
        })
      )
      .subscribe(
        (dto) => {
          this.setData(dto);
        },
        (error) => {
          this.setData([]);
        }
      );
  }

  setData(items: any) {
    this.ListItem = items;
    this.items = new MatTableDataSource<Item>(this.ListItem);
  }

  getItems(params: any) {
    return this.itemService.getItems(params);
  }

  openDialog(id: string) {
    console.log(id);
  }
}
