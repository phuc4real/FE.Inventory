import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
// import { Item, OrderDetail, UpdateOrderDetail } from 'src/app/models';
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
  // data: OrderDetail[] = [];
  // tableData = new MatTableDataSource<OrderDetail>();
  displayedColumns: string[] = [
    'itemImage',
    'itemName',
    'price',
    'quantity',
    'total',
    'actions',
  ];

  @ViewChild(MatAutocomplete) itemSearch!: MatAutocomplete;

  // items!: Item[];
  searchValue = '';

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
    // this.getTableData();
  }

  // getTableData() {
  //   let orderInfo = this.orderService.g();
  //   let details = orderInfo?.details ?? [];

  //   this.sumQuantity = 0;

  //   if (details.length < 1) {
  //     this.tableData = new MatTableDataSource<OrderDetail>(this.data);
  //   } else {
  //     details.forEach((detail) => {
  //       this.itemService.getById(detail.itemId).subscribe(
  //         (response) => {
  //           let object: OrderDetail = {
  //             item: response,
  //             quantity: detail.quantity,
  //             minPrice: detail.minPrice,
  //             maxPrice: detail.minPrice,
  //             minTotal: detail.minTotal,
  //             maxTotal: detail.maxTotal,
  //             note: detail.note,
  //           };

  //           // this.sumQuantity += detail.quantity;
  //           this.sumQuantity += parseInt(detail.quantity.toString());
  //           this.minTotal += parseInt(detail.minTotal.toString());
  //           this.maxTotal += parseInt(detail.maxTotal.toString());
  //           this.data.push(object);
  //           this.tableData = new MatTableDataSource<OrderDetail>(this.data);
  //         },
  //         (err: any) => showError(err, this.toastr)
  //       );
  //     });
  //   }
  // }

  // removeItem(id: number) {
  //   let result = this.orderService.removeFromObject(id);
  //   this.getTableData();
  //   if (result) {
  //     this.toastr.success('Remove item success', 'Success');
  //   } else this.toastr.error('Something went wrong', 'Error');
  // }

  // getItems() {
  //   let params: any = {
  //     name: this.searchValue,
  //   };
  //   this.itemService.getList(params).subscribe(
  //     (values) => {
  //       this.items = values;
  //     },
  //     (err: any) => showError(err, this.toastr)
  //   );
  // }

  // selectOption(e: any) {
  //   this.searchValue = e.option.value.name;
  //   this.openDialog(e.option.value.id);
  // }

  // openDialog(itemId: number): void {
  //   const dialogRef = this.dialog.open(AddOrderDialogComponent, {
  //     data: { quantity: 0, price: 0 },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result);

  //     let detail: UpdateOrderDetail = {
  //       itemId: itemId,
  //       quantity: result.quantity,
  //       minPrice: result.price,
  //       maxPrice: result.price,
  //       minTotal: result.price * result.quantity,
  //       maxTotal: result.price * result.quantity,
  //       note: result.note,
  //     };
  //     this.orderService.addToObject(detail);
  //     this.getTableData();
  //   });
  // }

  // clearAll() {
  //   this.orderService.removeObject();
  //   this.getTableData();
  // }

  // addOrder() {
  //   this.orderService.create().subscribe(
  //     (response) => {
  //       showMessage(response, this.toastr);
  //       this.router.navigate(['/' + response.headers.get('Location')]);
  //     },
  //     (err: any) => {
  //       showError(err, this.toastr);
  //       this.router.navigate(['/order']);
  //     }
  //   );
  //   this.clearAll();
  // }
}
