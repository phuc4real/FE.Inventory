import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketSummary } from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import { showError } from 'src/app/share/helpers';

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.css'],
})
export class TicketSummaryComponent {
  summary: TicketSummary = {
    review: 0,
    pending: 0,
    processing: 0,
    done: 0,
  };

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.ticketService.getTicketSummary().subscribe(
      (response) => {
        this.summary = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
