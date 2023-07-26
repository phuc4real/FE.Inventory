import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Item, TicketDetail } from 'src/app/models';
import { ItemService } from 'src/app/services';
import { TicketService } from 'src/app/services/ticket.service';
import { showError, showMessage } from 'src/app/share/helpers';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent {
  formGroup!: FormGroup;
  searchValue = '';

  items!: Item[];

  type: string[] = ['New', 'ChangeFrom', 'ChangeTo', 'Fix'];

  detailQuantity!: number;
  detailType!: number;

  data!: TicketDetail[];
  tableData = new MatTableDataSource<TicketDetail>();
  displayedColumns: string[] = ['itemName', 'quantity', 'type', 'actions'];

  constructor(
    private ticketService: TicketService,
    private itemService: ItemService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(''),
      purpose: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.getTableData();
  }

  getItems() {
    let params: any = {
      name: this.searchValue,
    };
    this.itemService.getList(params).subscribe(
      (values) => {
        this.items = values;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  selectOption(e: any) {
    this.searchValue = e.option.value.name;
    this.openDialog(e.option.value.id);
  }

  openDialog(itemId: string): void {
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {
      data: { quantity: this.detailQuantity, type: this.detailType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.ticketService.addToObject(itemId, result.quantity, result.type);
      this.getTableData();
    });
  }

  getTableData() {
    let ticket = this.ticketService.getObject();
    let ticketDetails = ticket?.details ?? [];

    this.data = [];
    if (ticketDetails.length < 1) {
      this.tableData = new MatTableDataSource<TicketDetail>(this.data);
    } else {
      ticketDetails.forEach((adddetail) => {
        this.itemService.getById(adddetail.itemId).subscribe(
          // (values) => {
          //   let detail: TicketDetail = {
          //     item: values,
          //     quantity: adddetail.quantity,
          //     type: this.type[adddetail.type - 1],
          //   };
          //   this.data.push(detail);
          //   this.tableData = new MatTableDataSource<TicketDetail>(this.data);
          // },
          (err: any) => showError(err, this.toastr)
        );
      });
    }
  }

  removeItem(id: string) {
    let result = this.ticketService.removeFromObject(id);
    this.getTableData();
    if (result) {
      this.toastr.success('Remove item success', 'Success');
    } else this.toastr.error('Something went wrong', 'Error');
  }

  clearAll() {
    this.ticketService.removeObject();
    this.getTableData();
  }
  addTicket() {
    let ticket = this.ticketService.getObject();

    ticket!.title = this.formGroup.value.title;
    ticket!.purpose = parseInt(this.formGroup.value.purpose);
    ticket!.description = this.formGroup.value.description;

    this.ticketService.create(ticket!).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/' + response.headers.get('Location')]);
      },
      (err: any) => {
        showError(err, this.toastr);
        this.router.navigate(['/ticket']);
      }
    );
    this.clearAll();
  }
}
