import { Component, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item, ExportDetail } from 'src/app/models';
import { ItemService, ExportService, UserService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';
import { AddExportDialogComponent } from '../add-export-dialog/add-export-dialog.component';

@Component({
  selector: 'app-add-export',
  templateUrl: './add-export.component.html',
  styleUrls: ['./add-export.component.css'],
})
export class AddExportComponent {
  tableData = new MatTableDataSource<ExportDetail>();
  data: ExportDetail[] = [];
  displayedColumns: string[] = ['itemName', 'quantity', 'forUser', 'actions'];

  @ViewChild(MatAutocomplete) itemSearch!: MatAutocomplete;

  items!: Item[];
  searchValue = '';
  description = '';
  detailQuantity!: number;
  userId!: string;

  constructor(
    private exportService: ExportService,
    private itemService: ItemService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let data = this.exportService.getObject();
    let details = data?.details ?? [];

    this.data = [];
    if (details.length < 1) {
      this.tableData = new MatTableDataSource<ExportDetail>(this.data);
    } else {
      details.forEach(async (d) => {
        let item = await this.itemService.getById(d.itemId).toPromise();
        if (d.forUserId)
          var user = await this.userService.getById(d.forUserId).toPromise();
        let detail: ExportDetail = {
          item: item!,
          quantity: d.quantity,
          forUser: user,
        };
        this.data.push(detail);
        this.tableData = new MatTableDataSource<ExportDetail>(this.data);
      });
    }
  }

  removeItem(id: string) {
    let result = this.exportService.removeFromObject(id);
    this.getTableData();
    if (result) {
      this.toastr.success('Remove item success', 'Success');
    } else this.toastr.error('Something went wrong', 'Error');
  }

  getItems() {
    let params: any = {
      name: this.searchValue,
    };
    this.itemService.getList(params).subscribe(
      (values) => {
        this.items = values;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  selectOption(e: any) {
    console.log(e);

    this.searchValue = e.option.value.name;
    this.openDialog(e.option.value.id);
  }

  openDialog(itemId: string): void {
    const dialogRef = this.dialog.open(AddExportDialogComponent, {
      data: { quantity: this.detailQuantity, userId: this.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.itemService.getById(itemId).subscribe(
        (response) => {
          if (response.inStock < result.quantity)
            this.toastr.warning('Item instock not enough');
          else
            this.exportService.addToObject(
              itemId,
              result.quantity,
              result.userId
            );
          this.getTableData();
        },
        (err: any) => showError(err, this.toastr)
      );
    });
  }

  clearAll() {
    this.exportService.removeObject();
    this.getTableData();
  }

  addExport() {
    this.exportService.addExport(this.description).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/' + response.headers.get('Location')]);
      },
      (err: any) => {
        showError(err, this.toastr);
        this.router.navigate(['/export']);
      }
    );
    this.clearAll();
  }
}
