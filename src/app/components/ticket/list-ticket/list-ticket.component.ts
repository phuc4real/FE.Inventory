import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, map } from 'rxjs';
import { TicketRecord } from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import { FormatDate, showError } from 'src/app/share/helpers';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css'],
})
export class ListTicketComponent {
  dataTable = new MatTableDataSource<TicketRecord>();
  displayedColumns: string[] = [
    'ticketId',
    'title',
    'ticketType',
    'description',
    'status',
    'createdAt',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchValue: string = '';
  data!: TicketRecord[];
  totalRecords!: number;

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator;
    this.getPaginator();
    this.dataTable.sort = this.sort;
  }

  matSortChange() {
    this.applyFilter();
  }

  applyFilter() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.paginator.firstPage();
  }

  getPaginator() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          const params: any = {
            index: this.paginator?.pageIndex,
            size: this.paginator?.pageSize,
            sort: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.ticketService
            .getTickets(params)
            .pipe(catchError(async (err) => showError(err, this.toastr)));
        }),
        map((response) => {
          if (response == null) return [];
          this.totalRecords = response.count;
          return response.data;
        })
      )
      .subscribe(
        (response) => {
          this.data = response;
          this.dataTable = new MatTableDataSource<TicketRecord>(this.data);
        },
        (error: any) => {
          this.data = [];
          this.dataTable = new MatTableDataSource<TicketRecord>(this.data);
          showError(error, this.toastr);
        }
      );
  }

  formattedDate(date: any) {
    return FormatDate(date);
  }
}
