import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketRecord } from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import { FormatDate, showError } from 'src/app/share/helpers';

@Component({
  selector: 'dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  tickets: TicketRecord[] = [];

  params: any = {
    index: 0,
    size: 10,
    sort: 'updatedAt',
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
  formattedDate(date: Date) {
    return FormatDate(date);
  }
}
