import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap, catchError, of, map } from 'rxjs';
import { Ticket } from 'src/app/models';
import { TicketService } from 'src/app/services/ticket.service';
import { toStringFormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css'],
})
export class ListTicketComponent {
  dataTable = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = [
    'id',
    'title',
    'purpose',
    'description',
    'pmStatus',
    'status',
    'createdDate',
    'createdByUser',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchValue: string = '';
  data!: Ticket[];
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
            pageIndex: this.paginator?.pageIndex,
            pageSize: this.paginator?.pageSize,
            sortField: this.sort?.active,
            sortDirection: this.sort?.direction,
            searchKeyword: this.searchValue,
          };
          return this.ticketService
            .getPagination(params)
            .pipe(catchError(() => of(null)));
        }),
        map((dto) => {
          if (dto == null) return [];
          this.totalRecords = dto.totalRecords;
          return dto.data;
        })
      )
      .subscribe(
        (dto) => {
          this.setData(dto);
        },
        (error: any) => {
          this.setData([]);
        }
      );
  }

  setData(data: any) {
    this.data = data;
    this.dataTable = new MatTableDataSource<Ticket>(this.data);
  }

  dateString(date: any) {
    return toStringFormatDate(date);
  }
}
