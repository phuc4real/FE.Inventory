import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ItemService, OrderService } from 'src/app/services';
import { Router } from '@angular/router';
import { showError, showMessage } from 'src/app/share/helpers';
import {
  Item,
  OrderEntry,
  OrderEntryUpdate,
  OrderUpdate,
} from 'src/app/models';
import { AddOrderDialogComponent } from '../add-order-dialog/add-order-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent {
  entries: OrderEntry[] = [];
  entriesDS = new MatTableDataSource<OrderEntry>();
  displayedColumns: string[] = [
    'itemImage',
    'itemName',
    'price',
    'quantity',
    'total',
    'note',
    'actions',
  ];

  @ViewChild(MatAutocomplete) itemSearch!: MatAutocomplete;

  items!: Item[];
  searchValue = '';
  description = '';
  minTotal: number = 0;
  maxTotal: number = 0;
  sumQuantity: number = 0;
  isHasData: boolean = false;

  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    //clear old data
    this.sumQuantity = 0;
    this.minTotal = 0;
    this.maxTotal = 0;
    this.entries = [];
    this.entriesDS = new MatTableDataSource<OrderEntry>(this.entries);

    let entriesLocal = this.orderService.getEntriesData();
    let data = entriesLocal?.data ?? [];

    if (data.length > 0) {
      this.isHasData = true;
      data.forEach((entry) => {
        console.log(entry);

        this.itemService.getByIdCompact(entry.itemId).subscribe(
          (response) => {
            let object: OrderEntry = {
              id: entry.id,
              recordId: entry.recordId,
              item: response.data,
              quantity: entry.quantity,
              minPrice: entry.minPrice,
              maxPrice: entry.maxPrice,
              note: entry.note,
            };

            this.sumQuantity += entry.quantity * 1;
            this.minTotal += entry.minPrice * entry.quantity;
            this.maxTotal += entry.maxPrice * entry.quantity;
            this.entries.push(object);
            this.entriesDS = new MatTableDataSource<OrderEntry>(this.entries);
          },
          (err: any) => showError(err, this.toastr)
        );
      });
    }
  }

  removeItem(id: number) {
    let result = this.orderService.removeEntry(id);

    if (result) {
      this.toastr.success('Remove item success', 'Success');
      this.getTableData();
      let entryCount = this.orderService.getEntriesData()?.data.length;
      if (entryCount == 0) this.isHasData = false;
    } else this.toastr.error('Something went wrong', 'Error');
  }

  getItems() {
    const params: any = {
      index: 0,
      size: 0,
      searchKeyword: this.searchValue,
    };
    this.itemService.getItems(params).subscribe(
      (response) => {
        this.items = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  selectOption(e: any) {
    this.searchValue = e.option.value.name;
    this.openDialog(e.option.value.id);
  }

  openDialog(itemId: number): void {
    let entry: OrderEntryUpdate = {
      id: 0,
      recordId: 0,
      itemId: itemId,
      quantity: 0,
      minPrice: 0,
      maxPrice: 0,
      note: '',
    };
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      data: entry,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      let entry: OrderEntryUpdate = {
        id: 0,
        recordId: 0,
        itemId: itemId,
        quantity: result.quantity,
        minPrice: result.minPrice,
        maxPrice: result.maxPrice,
        note: result.note,
      };

      this.orderService.addEntry(entry);
      this.getTableData();
    });
  }

  clearAll() {
    this.orderService.removeEntries();
    this.isHasData = false;
  }

  addOrder() {
    let order: OrderUpdate = {
      recordId: 0,
      description: '',
      orderEntries: this.orderService.getEntriesData()?.data!,
    };

    this.orderService.createOrder(order).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/' + response.orderId]);
      },
      (err: any) => {
        showError(err, this.toastr);
      }
    );

    this.router.navigate(['/order']);
    this.clearAll();
  }
}
