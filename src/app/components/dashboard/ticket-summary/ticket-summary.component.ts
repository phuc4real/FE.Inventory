import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';
import { showError } from 'src/app/share/helpers';

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.css'],
})
export class TicketSummaryComponent {
  ticketCount: any = {
    pending: 0,
    processing: 0,
    completed: 0,
    rejected: 0,
  };

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.ticketService.getTicketChart().subscribe(
      (response) => {
        this.ticketCount = response;
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
