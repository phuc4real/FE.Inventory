import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import { showError } from 'src/app/share/helpers';

@Component({
  selector: 'dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  tickets: Ticket[] = [];

  params: any = {
    pageIndex: 0,
    pageSize: 7,
    sortField: 'updatedDate',
    sortDirection: 'desc',
  };

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
    this.getData();
  }

  getData() {
    this.ticketService.getTickets(this.params).subscribe(
      (response) => {
        this.tickets = response ? response.data : [];
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
