import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/services';
import { TicketService } from 'src/app/services/ticket.service';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Item, TicketEntry, TicketEntryUpdate } from 'src/app/models';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent {
  recordId!: number;
  entries: TicketEntry[] = [];
  entriesDS = new MatTableDataSource<TicketEntry>();
  displayedColumns: string[] = [
    'itemImage',
    'itemName',
    'quantity',
    'type',
    'note',
    'actions',
  ];
  formGroup!: FormGroup;

  items!: Item[];
  searchValue = '';
  isHasData: boolean = false;

  constructor(
    private ticketService: TicketService,
    private itemService: ItemService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(''),
      type: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    // this.getTableData();
  }

  // getItems() {
  //   let params: any = {
  //     name: this.searchValue,
  //   };
  //   this.itemService.getList(params).subscribe(
  //     (values) => {
  //       this.items = values;
  //     },
  //     (err: any) => showError(err, this.toastr)
  //   );
  // }

  selectOption(e: any) {
    this.searchValue = e.option.value.name;
    this.openDialog(e.option.value.id);
  }

  openDialog(itemId: number): void {
    let entry: TicketEntryUpdate = {
      id: 0,
      recordId: 0,
      itemId: itemId,
      quantity: 0,
      note: '',
    };
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {
      data: entry,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.ticketService.addToObject(itemId, result.quantity, result.type);
      // this.getTableData();
    });
  }

  // getTableData() {
  //   let ticket = this.ticketService.getObject();
  //   let ticketDetails = ticket?.details ?? [];

  //   this.data = [];
  //   if (ticketDetails.length < 1) {
  //     this.tableData = new MatTableDataSource<TicketDetail>(this.data);
  //   } else {
  //     ticketDetails.forEach((adddetail) => {
  //       this.itemService.getById(adddetail.itemId).subscribe(
  //         // (values) => {
  //         //   let detail: TicketDetail = {
  //         //     item: values,
  //         //     quantity: adddetail.quantity,
  //         //     type: this.type[adddetail.type - 1],
  //         //   };
  //         //   this.data.push(detail);
  //         //   this.tableData = new MatTableDataSource<TicketDetail>(this.data);
  //         // },
  //         (err: any) => showError(err, this.toastr)
  //       );
  //     });
  //   }
  // }

  // removeItem(id: number) {
  //   let result = this.ticketService.removeFromObject(id);
  //   this.getTableData();
  //   if (result) {
  //     this.toastr.success('Remove item success', 'Success');
  //   } else this.toastr.error('Something went wrong', 'Error');
  // }

  // clearAll() {
  //   this.ticketService.removeObject();
  //   this.getTableData();
  // }
  // addTicket() {
  //   let ticket = this.ticketService.getObject();

  //   ticket!.title = this.formGroup.value.title;
  //   ticket!.purpose = parseInt(this.formGroup.value.purpose);
  //   ticket!.description = this.formGroup.value.description;

  //   this.ticketService.create(ticket!).subscribe(
  //     (response) => {
  //       showMessage(response, this.toastr);
  //       this.router.navigate(['/' + response.headers.get('Location')]);
  //     },
  //     (err: any) => {
  //       showError(err, this.toastr);
  //       this.router.navigate(['/ticket']);
  //     }
  //   );
  //   this.clearAll();
  // }
}
