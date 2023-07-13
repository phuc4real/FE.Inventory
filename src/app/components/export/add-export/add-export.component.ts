import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models';
import { Export, ExportDetail } from 'src/app/models/export';
import { ItemService } from 'src/app/services';
import { ExportService } from 'src/app/services/export.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-export',
  templateUrl: './add-export.component.html',
  styleUrls: ['./add-export.component.css'],
})
export class AddExportComponent {
  tableData = new MatTableDataSource<ExportDetail>();
  data: ExportDetail[] = [];
  displayedColumns: string[] = ['itemName', 'quantity', 'actions'];

  @ViewChild(MatAutocomplete) itemSearch!: MatAutocomplete;

  items!: Item[];
  searchValue = '';
  detailQuantity!: number;

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
    throw new Error('Method not implemented.');
  }

  getItems() {
    throw new Error('Method not implemented.');
  }

  selectOption(e: any) {
    throw new Error('Method not implemented.');
  }

  clearAll() {
    throw new Error('Method not implemented.');
  }

  addExport() {
    throw new Error('Method not implemented.');
  }
}
