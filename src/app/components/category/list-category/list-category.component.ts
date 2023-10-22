import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Category } from 'src/app/models';
import { CategoryService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';
import { UpdateCategoryDialogComponent } from '../..';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'actions'];
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
            index: this.paginator?.pageIndex,
            size: this.paginator?.pageSize,
            sort: 'updatedAt',
            sortDirection: 'desc',
            searchKeyword: this.searchValue,
            isInactive: false,
          };
          return this.categoryService
            .getCategories(params)
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
    const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
      data: { name: name, title: title },
      position: { top: '16vh' },
    });

    dialogRef.afterClosed().subscribe((categoryName) => {
      if (categoryName) this.updateCatalog(id, categoryName);
    });
  }

  updateCatalog(id: number, categoryName: string) {
    let data: Category = {
      id: id,
      name: categoryName,
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
