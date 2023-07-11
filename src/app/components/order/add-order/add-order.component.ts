import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Item, OrderDetail } from 'src/app/models';
import { ItemService } from 'src/app/services';
import { OrderService } from 'src/app/services/order.service';
import { AddOrderDialogComponent } from '../add-order-dialog/add-order-dialog.component';
import { Router } from '@angular/router';

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

  myControl: FormControl;
  items!: Item[];
  searchValue = '';

  detailQuantity!: number;
  detailPrice!: number;

  orderTotal: number = 0;
  sumQuantity: number = 0;

  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let order = this.orderService.getAddOrder();
    let addOrderDetails = order?.details ?? [];

    this.listDetail = [];
    this.sumQuantity = 0;
    this.orderTotal = order?.orderTotal ?? 0;
    if (addOrderDetails.length < 1) {
      this.details = new MatTableDataSource<OrderDetail>(this.listDetail);
    } else {
      addOrderDetails.forEach((adddetail) => {
        this.itemService.getById(adddetail.itemId).subscribe(
          (values) => {
            let detail: OrderDetail = {
              item: values,
              quantity: adddetail.quantity,
              price: adddetail.price,
              total: adddetail.total,
            };

            // this.sumQuantity += detail.quantity;
            this.sumQuantity += Number.parseInt(adddetail.quantity.toString());
            this.listDetail.push(detail);
            this.details = new MatTableDataSource<OrderDetail>(this.listDetail);
          },
          (error: any) => {
            this.toastr.error('Something went wrong!', 'Error');
          }
        );
      });
    }
  }

  removeItem(id: string) {
    let result = this.orderService.removeItemFromOrder(id);
    this.getTableData();
    if (result) {
      this.toastr.success('Remove item success', 'Success');
    } else this.toastr.error('Something went wrong', 'Error');
  }

  getItems() {
    let params: any = {
      name: this.searchValue,
    };
    this.itemService.getListItem(params).subscribe(
      (values) => {
        this.items = values;
      },
      (error: any) => {
        if (error.status != 404)
          this.toastr.error('Something went wrong', 'Error');
        console.log(error);
      }
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
      this.orderService.addItemToOrder(itemId, result.quantity, result.price);
      this.getTableData();
    });
  }

  clearAll() {
    this.orderService.removeAddOrder();
    this.getTableData();
  }

  addOrder() {
    this.orderService.addOrder().subscribe(
      (response) => {
        this.toastr.success(response.body[0].value, response.body[0].key);
        this.router.navigate(['/' + response.headers.get('Location')]);
        console.log(response);
      },
      (error: any) => {
        if (error.messages[0]) this.toastr.error(error[0].value, error[0].key);
        else this.toastr.error('Something went wrong!', 'Error');
        this.router.navigate(['/order']);
        console.log(error);
      }
    );
    this.clearAll();
  }
}
