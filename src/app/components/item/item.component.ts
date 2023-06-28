import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../services';
import { Item } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items!: MatTableDataSource<Item>;
  displayedColumns: string[] = ['id', 'name', 'description', 'catalog', 'inStock', 'used'];
  searchValue: string = '';
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    const params: any = {
      pageIndex: this.paginator?.pageIndex + 1,
      pageSize: this.paginator?.pageSize,
      sortField: this.sort?.active,
      sortDirection: this.sort?.direction,
      searchKeyword: this.searchValue,
    };

    this.itemService.getItems(params)
      .subscribe(items => {
        this.items = new MatTableDataSource<Item>(items);
        this.items.sort = this.sort;
        this.items.paginator = this.paginator;
      });
  }

  applyFilter() {
    this.paginator.firstPage();
    this.getItems();
  }

}
