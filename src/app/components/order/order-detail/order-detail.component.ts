import { formatDate, formatNumber } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';

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

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
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
    this.orderService.getById(this.orderId).subscribe(
      (values) => {
        console.log(values);
        this.listDetail = values.details;
        this.details = new MatTableDataSource<OrderDetail>(this.listDetail);

        this.orderForm.patchValue({
          id: values.id,
          orderDate: formatDate(
            values.orderDate,
            'hh:mm:ss - dd/MM/yyyy',
            'en-US'
          ),
          status: values.status,
          orderTotal: formatNumber(values.orderTotal, 'en-US', '1.0-0'),
          user: values.orderByUser.userName,
          completeDate: formatDate(
            values.completeDate,
            'hh:mm:ss - dd/MM/yyyy',
            'en-US'
          ),
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
