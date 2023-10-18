import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Categories, Category, CategoryObject } from 'src/app/models';
import { CategoryService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';
import { UpdateCatalogDialogComponent } from '../update-catalog-dialog/update-catalog-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrls: ['./list-catalog.component.css'],
})
export class ListCatalogComponent {
  data = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  searchValue: string = '';
  total!: number;
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.getPaginator();
    this.data.sort = this.sort;
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
          return this.categoryService
            .getCategory(params)
            .pipe(catchError(() => of(null)));
        }),
        map((response) => {
          this.total = response!.count;
          return response!.data;
        })
      )
      .subscribe(
        (result) => {
          this.data = new MatTableDataSource<Category>(result);
        },
        (error) => {
          showError(error, this.toastr);
          this.data = new MatTableDataSource<Category>([]);
        }
      );
  }

  deteleCatalog(id: number) {
    this.categoryService.delete(id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  openDialog(id: number, name: string): void {
    let title = id == 0 ? 'Add new category' : 'Edit category info';
    const dialogRef = this.dialog.open(UpdateCatalogDialogComponent, {
      data: { name: name, title: title },
      position: { top: '16vh' },
    });

    dialogRef.afterClosed().subscribe((catalogName) => {
      if (catalogName) this.updateCatalog(id, catalogName);
    });
  }

  updateCatalog(id: number, catalogName: string) {
    let data: Category = {
      id: id,
      name: catalogName,
    };

    if (id != 0) {
      this.categoryService.update(id, data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.refreshData();
        },
        (err: any) => showError(err, this.toastr)
      );
    } else {
      this.categoryService.create(data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.refreshData();
        },
        (err: any) => {
          showError(err, this.toastr);
        }
      );
    }
  }
}
