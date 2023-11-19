import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderEntry, OrderRecord, RecordHistory } from 'src/app/models';
import { OrderService } from 'src/app/services';
import { FormatDate, showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  orderForm!: FormGroup;
  recordId!: number;
  orderId!: number;
  entries = new MatTableDataSource<OrderEntry>();
  defaultRecord!: number;
  histories: RecordHistory[] = [];
  displayedColumns: string[] = [
    'itemImage',
    'itemName',
    'quantity',
    'price',
    'total',
  ];
  orderStatus: string[] = ['Pending', 'Processing', 'Done', 'Cancel'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.orderForm = new FormGroup({
      id: new FormControl(''),
      orderDate: new FormControl(''),
      status: new FormControl(''),
      orderBy: new FormControl(''),
      description: new FormControl(''),
    });
    this.route.params.subscribe((params) => {
      this.recordId = params['id'];
      this.getData();
    });
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.orderService.getById(this.recordId).subscribe(
      (response) => {
        this.histories = response.history;
        this.defaultRecord = response.data.recordId;
        this.orderId = response.data.orderId;
        this.orderForm.patchValue({
          id: response.data.orderId,
          orderDate: FormatDate(response.data.createdAt),
          status: response.data.status,
          orderBy: response.data.createdBy,
          description: response.data.description,
        });
      },
      (err: any) => showError(err, this.toastr)
    );

    this.orderService.getOrderEntries(this.recordId).subscribe(
      (response) => {
        this.entries = new MatTableDataSource<OrderEntry>(response.data);
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  historyToString(history: RecordHistory) {
    return `Record No. #${history.number} at ${FormatDate(
      history.createdAt
    )} by ${history.createdBy}`;
  }

  updateStatus() {
    this.orderService.updateStatus(this.orderId).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.getData();
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.orderId).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.getData();
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
