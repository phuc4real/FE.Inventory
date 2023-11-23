import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CreateCommentRequest,
  Operation,
  OrderEntry,
  RecordHistory,
  StatusCheck,
} from 'src/app/models';
import { OrderService } from 'src/app/services';
import {
  FormatDate,
  checkStatusOperation,
  getOperation,
  showError,
  showMessage,
} from 'src/app/share/helpers';
import { CommentComponent } from '../../comment/comment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  operation!: Operation;
  statusCheck!: StatusCheck;
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
    'note',
  ];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.operation = getOperation();
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

  getData() {
    this.orderService.getById(this.recordId).subscribe(
      (response) => {
        this.histories = response.history;
        this.defaultRecord = response.data.recordId;
        this.statusCheck = checkStatusOperation(response.data.status);
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

  openDialog(): void {
    let comment: CreateCommentRequest = {
      recordId: this.recordId,
      isTicketComment: false,
      isReject: false,
      message: '',
    };
    const dialogRef = this.dialog.open(CommentComponent, {
      data: comment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.orderService.approvalOrder(this.recordId, result).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.getData();
        },
        (err) => showError(err, this.toastr)
      );
    });
  }
}
