import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../services';
import { Item, ItemDTO } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap, of } from 'rxjs';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  items = new MatTableDataSource<Item>();
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'catalog',
    'inStock',
    'used',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  searchValue: string = '';
  ListItem!: Item[];
  totalItem!: number;
  constructor(private itemService: ItemService) {}

  ngAfterViewInit() {
    this.items.paginator = this.paginator;
    this.getPaginator();
  }

  applyFilter() {
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
          this.ListItem = dto;
          this.items = new MatTableDataSource<Item>(this.ListItem);
        },
        (error) => {
          this.ListItem = [];
          this.items = new MatTableDataSource<Item>(this.ListItem);
        }
      );
  }

  getItems(params: any) {
    return this.itemService.getItems(params);
  }
}
