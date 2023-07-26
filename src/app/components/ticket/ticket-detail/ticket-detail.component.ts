import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketDetail } from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import {
  showError,
  showMessage,
  toStringFormatDate,
  toStringFormatNumber,
} from 'src/app/share/helpers';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent {
  formGroup!: FormGroup;

  id!: number;
  isClosed: boolean = true;

  data!: TicketDetail[];
  tableData = new MatTableDataSource<TicketDetail>();
  displayedColumns: string[] = ['itemName', 'quantity', 'type'];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      purpose: new FormControl(''),
      description: new FormControl(''),
      leaderApprove: new FormControl(''),
      status: new FormControl(''),
      rejectReason: new FormControl(''),
      closedDate: new FormControl(''),
      createdDate: new FormControl(''),
      createdByUser: new FormControl(''),
      lastModifiedDate: new FormControl(''),
      modifiedByUser: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.ticketService.getById(this.id).subscribe(
      (response) => {
        // this.data = response.details;
        this.tableData = new MatTableDataSource<TicketDetail>(this.data);

        console.log(response);

        // this.formGroup.patchValue({
        //   id: response.id,
        //   title: response.title,
        //   purpose: response.purpose,
        //   description: response.description,
        //   leaderApprove: response.leaderApprove,
        //   status: response.status,
        //   createdDate: toStringFormatDate(response.createdDate),
        //   createdByUser: response.createdByUser.userName,
        //   lastModifiedDate: toStringFormatDate(response.lastModifiedDate),
        //   modifiedByUser: response.modifiedByUser.userName,
        // });

        // if (response.isClosed) {
        //   this.formGroup.patchValue({
        //     rejectReason: response.rejectReason,
        //     closedDate: toStringFormatDate(response.closedDate),
        //   });
        // }
        // this.isClosed = response.isClosed;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  cancelTicket() {
    this.ticketService.cancel(this.id).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/ticket']);
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
