import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CreateCommentRequest,
  RecordHistory,
  TicketEntry,
} from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import { FormatDate, showError, showMessage } from 'src/app/share/helpers';
import { CommentComponent } from '../../comment/comment.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent {
  formGroup!: FormGroup;
  defaultRecord!: number;
  histories: RecordHistory[] = [];
  ticketId!: number;
  recordId!: number;
  entries = new MatTableDataSource<TicketEntry>();
  displayedColumns: string[] = ['itemImage', 'itemName', 'quantity', 'note'];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
    this.formGroup = new FormGroup({
      ticketId: new FormControl(''),
      title: new FormControl(''),
      type: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      commentAt: new FormControl(''),
      commentBy: new FormControl(''),
      message: new FormControl(''),
      createdAt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedAt: new FormControl(''),
      updatedBy: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recordId = params['id'];
      this.getData();
    });
  }

  getData() {
    this.ticketService.getById(this.recordId).subscribe(
      (response) => {
        this.histories = response.history;
        this.defaultRecord = response.data.recordId;
        this.ticketId = response.data.ticketId;
        this.formGroup.patchValue({
          ticketId: response.data.ticketId,
          title: response.data.title,
          type: response.data.ticketType,
          description: response.data.description,
          commentAt:
            FormatDate(response.data.comment?.commentAt) ?? 'No comment',
          status: response.data.status,
          commentBy: response.data.comment?.commentBy ?? 'No comment',
          message: response.data.comment?.message ?? 'No comment',
          createdAt: FormatDate(response.data.createdAt),
          createdBy: response.data.createdBy,
          updatedAt: FormatDate(response.data.updatedAt),
          updatedBy: response.data.updatedBy,
        });
      },
      (err: any) => showError(err, this.toastr)
    );

    this.ticketService.getTicketEntries(this.recordId).subscribe(
      (response) => {
        this.entries = new MatTableDataSource<TicketEntry>(response.data);
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  updateStatus() {
    this.ticketService.updateStatus(this.ticketId).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.getData();
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  cancelTicket() {
    this.ticketService.cancelTicket(this.ticketId).subscribe(
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
      isTicketComment: true,
      isReject: false,
      message: '',
    };
    const dialogRef = this.dialog.open(CommentComponent, {
      data: comment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ticketService.approvalTicket(this.recordId, result).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.getData();
        },
        (err) => showError(err, this.toastr)
      );
    });
  }
  historyToString(history: RecordHistory) {
    return `Record No. #${history.number} at ${FormatDate(
      history.createdAt
    )} by ${history.createdBy}`;
  }
}
