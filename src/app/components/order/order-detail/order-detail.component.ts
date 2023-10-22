import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  orderForm!: FormGroup;
  orderId!: number;
  // details = new MatTableDataSource<OrderDetail>();
  // listDetail!: OrderDetail[];
  displayedColumns: string[] = [
    'itemImage',
    'itemName',
    'quantity',
    'price',
    'total',
  ];
  status: string = '';
  orderStatus: string[] = ['Pending', 'Processing', 'Done', 'Cancel'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.orderForm = new FormGroup({
      id: new FormControl(''),
      orderDate: new FormControl(''),
      status: new FormControl(''),
      total: new FormControl(''),
      approve: new FormControl(''),
      approveBy: new FormControl(''),
      user: new FormControl(''),
      completeDate: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
  }

  ngAfterViewInit() {
    // this.getData();
  }

  // getData() {
  //   this.orderService.getById(this.orderId).subscribe(
  //     (values) => {
  //       let orderInfo = values.history[0];
  //       this.details = new MatTableDataSource<OrderDetail>(orderInfo.details);
  //       let completeDateString = isDefaultDate(values.completeDate)
  //         ? 'Not Complete'
  //         : toStringFormatDate(values.completeDate);
  //       this.orderForm.patchValue({
  //         id: values.id,
  //         orderDate: toStringFormatDate(values.createdDate),
  //         status: orderInfo.status,
  //         user: values.createdByUser.userName,
  //         approve: orderInfo.decision ? orderInfo.decision.status : '',
  //         approveBy: orderInfo.decision ? orderInfo.decision.byUser : '',
  //         total: orderInfo.minTotal + ' - ' + orderInfo.maxTotal,
  //         completeDate: completeDateString,
  //       });
  //     },
  //     (err: any) => showError(err, this.toastr)
  //   );
  // }

  // updateStatus() {
  //   this.orderService.updateStatus(this.orderId).subscribe(
  //     (response) => {
  //       showMessage(response, this.toastr);
  //       this.getData();
  //     },
  //     (err: any) => showError(err, this.toastr)
  //   );
  // }

  // cancelOrder() {
  //   this.orderService.cancel(this.orderId).subscribe(
  //     (response) => {
  //       showMessage(response, this.toastr);
  //       this.status = '';
  //       this.getData();
  //     },
  //     (err: any) => showError(err, this.toastr)
  //   );
  // }
}
