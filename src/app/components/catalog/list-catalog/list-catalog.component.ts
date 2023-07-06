import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Catalog } from 'src/app/models';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrls: ['./list-catalog.component.css'],
})
export class ListCatalogComponent {
  catalogs = new MatTableDataSource<Catalog>();
  displayedColumns: string[] = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  searchValue: string = '';
  listCatalog!: Catalog[];
  totalCatalog!: number;

  constructor(
    private catalogService: CatalogService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.catalogs.paginator = this.paginator;
    this.getPaginator();
    this.catalogs.sort = this.sort;
  }

  matSortChange(e: any) {
    if (e.active != 'actions') this.applyFilter();
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
            sortField: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.getCatalogs(params).pipe(catchError(() => of(null)));
        }),
        map((dto) => {
          if (dto == null) return [];
          this.totalCatalog = dto.totalRecords;
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

  setData(catalogs: any) {
    this.listCatalog = catalogs;
    this.catalogs = new MatTableDataSource<Catalog>(this.listCatalog);
  }

  getCatalogs(params: any) {
    return this.catalogService.getCatalogs(params);
  }

  deteleCatalog(id: number) {
    this.catalogService.deleteCatalog(id).subscribe(
      (response) => {
        this.applyFilter();
        if (response[0]) {
          this.toastr.success(response[0].value, response[0].key);
        }
      },
      (error: any) => {
        this.toastr.error('Something went wrong!', 'Error');
        console.log(error);
      }
    );
  }
}
