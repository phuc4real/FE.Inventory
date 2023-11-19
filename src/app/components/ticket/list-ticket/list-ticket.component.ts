import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, map } from 'rxjs';
import { TicketEntry, TicketRecord } from 'src/app/models';
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
    'id',
    'title',
    'type',
    'description',
    'status',
    'create',
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
          this.setData(response);
        },
        (error: any) => {
          this.setData([]);
        }
      );
  }

  setData(data: any) {
    this.data = data;
    this.dataTable = new MatTableDataSource<TicketRecord>(this.data);
  }

  dateString(date: any) {
    return FormatDate(date);
  }
}
