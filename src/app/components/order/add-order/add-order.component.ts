import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Item, OrderDetail, UpdateOrderDetail } from 'src/app/models';
import { ItemService, OrderService } from 'src/app/services';
import { AddOrderDialogComponent } from '../add-order-dialog/add-order-dialog.component';
import { Router } from '@angular/router';
import { showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent {
  details = new MatTableDataSource<OrderDetail>();
  listDetail: OrderDetail[] = [];
  displayedColumns: string[] = [
    'itemName',
    'price',
    'quantity',
    'total',
    'actions',
  ];

  @ViewChild(MatAutocomplete) itemSearch!: MatAutocomplete;

  items!: Item[];
  searchValue = '';

  detailQuantity!: number;
  detailPrice!: number;

  minTotal: number = 0;
  maxTotal: number = 0;
  sumQuantity: number = 0;

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
    let order = this.orderService.getObject();
    let addOrderDetails = order?.details ?? [];

    this.listDetail = [];
    this.sumQuantity = 0;
    this.minTotal = order?.minTotal ?? 0;
    this.maxTotal = order?.maxTotal ?? 0;

    if (addOrderDetails.length < 1) {
      this.details = new MatTableDataSource<OrderDetail>(this.listDetail);
    } else {
      addOrderDetails.forEach((adddetail) => {
        this.itemService.getById(adddetail.itemId).subscribe(
          (values) => {
            let detail: OrderDetail = {
              item: values,
              quantity: adddetail.quantity,
              minPrice: adddetail.minPrice,
              maxPrice: adddetail.minPrice,
              minTotal: adddetail.minTotal,
              maxTotal: adddetail.maxTotal,
              note: adddetail.note,
            };

            // this.sumQuantity += detail.quantity;
            this.sumQuantity += Number.parseInt(adddetail.quantity.toString());
            this.listDetail.push(detail);
            this.details = new MatTableDataSource<OrderDetail>(this.listDetail);
          },
          (err: any) => showError(err, this.toastr)
        );
      });
    }
  }

  removeItem(id: string) {
    let result = this.orderService.removeFromObject(id);
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
    this.searchValue = e.option.value.name;
    this.openDialog(e.option.value.id);
  }

  openDialog(itemId: string): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      data: { quantity: this.detailQuantity, price: this.detailPrice },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let detail: UpdateOrderDetail = {
        itemId: itemId,
        quantity: result.quantity,
        minPrice: result.price,
        maxPrice: result.price,
        minTotal: result.price * result.quantity,
        maxTotal: result.price * result.quantity,
        note: result.note,
      };
      this.orderService.addToObject(detail);
      this.getTableData();
    });
  }

  clearAll() {
    this.orderService.removeObject();
    this.getTableData();
  }

  addOrder() {
    this.orderService.create().subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/' + response.headers.get('Location')]);
      },
      (err: any) => {
        showError(err, this.toastr);
        this.router.navigate(['/order']);
      }
    );
    this.clearAll();
  }
}
