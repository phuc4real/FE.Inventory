import { formatDate, formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDetail } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';
import {
  isDefaultDate,
  toStringFormatDate,
  toStringFormatNumber,
} from 'src/app/share/helpers/utilities-hepler';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  orderForm!: FormGroup;
  orderId!: number;
  details = new MatTableDataSource<OrderDetail>();
  listDetail!: OrderDetail[];
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
      orderTotal: new FormControl(''),
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
    this.getData();
  }

  getData() {
    this.orderService.getById(this.orderId).subscribe(
      (values) => {
        this.listDetail = values.details;
        this.details = new MatTableDataSource<OrderDetail>(this.listDetail);
        let index = this.orderStatus.findIndex((x) => x == values.status);
        if (index < 2) this.status = this.orderStatus[index + 1];
        else this.status = '';
        let completeDateString = isDefaultDate(values.completeDate)
          ? 'Not Complete'
          : toStringFormatDate(values.completeDate);
        this.orderForm.patchValue({
          id: values.id,
          orderDate: toStringFormatDate(values.orderDate),
          status: values.status,
          orderTotal: toStringFormatNumber(values.orderTotal),
          user: values.orderByUser.userName,
          completeDate: completeDateString,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateStatus() {
    this.orderService.updateStatus(this.orderId).subscribe(
      (response) => {
        if (response[0])
          this.toastr.success(response[0].value, response[0].key);
        this.getData();
      },
      (errors: any) => {
        if (errors.error[0])
          this.toastr.error(errors.error[0].value, errors.error[0].key);
        else this.toastr.error('Something went wrong', 'Error');
      }
    );
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.orderId).subscribe(
      (response) => {
        if (response[0])
          this.toastr.success(response[0].value, response[0].key);
        this.status = '';
        this.getData();
      },
      (errors: any) => {
        if (errors.error[0])
          this.toastr.error(errors.error[0].value, errors.error[0].key);
        else this.toastr.error('Something went wrong', 'Error');
      }
    );
  }
}
