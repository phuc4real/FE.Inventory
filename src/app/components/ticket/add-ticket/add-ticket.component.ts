import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/services';
import { TicketService } from 'src/app/services/ticket.service';
import { AddTicketDialogComponent } from '../add-ticket-dialog/add-ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Item,
  TicketEntry,
  TicketEntryUpdate,
  TicketType,
  TicketUpdate,
} from 'src/app/models';
import { showError, showMessage } from 'src/app/share/helpers';

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
    'note',
    'actions',
  ];
  formGroup!: FormGroup;

  items!: Item[];
  searchValue = '';
  isHasData: boolean = false;
  ticketTypes!: TicketType[];
  defaultType!: number;

  constructor(
    private ticketService: TicketService,
    private itemService: ItemService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(''),
      type: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.setToDefault();
    this.getTicketType();
    this.route.params.subscribe(async (params) => {
      this.recordId = params['id'] ?? 0;
      if (this.recordId != 0) {
        await this.setEntriesFromRecord();
        this.getTableData();
      } else {
        this.getTableData();
      }
    });
  }

  setToDefault() {
    this.ticketService.removeEntries();
    this.formGroup.value.title = '';
    this.formGroup.value.description = '';
  }

  getTableData() {
    this.entries = [];
    let entriesLocal = this.ticketService.getEntriesData();
    let data = entriesLocal?.data ?? [];
    if (data.length > 0) {
      this.isHasData = true;
      console.log(data);

      data.forEach((entry) => {
        this.itemService.getByIdCompact(entry.itemId).subscribe(
          (response) => {
            let object: TicketEntry = {
              id: entry.id,
              recordId: entry.recordId,
              note: entry.note,
              item: response.data,
              quantity: entry.quantity,
            };
            this.entries.push(object);
            this.entriesDS = new MatTableDataSource<TicketEntry>(this.entries);
          },
          (err: any) => showError(err, this.toastr)
        );
      });
    }
  }

  setEntriesFromRecord(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.ticketService.getTicketEntries(this.recordId).subscribe(
        (response) => {
          response.data.forEach((e) => {
            let entry: TicketEntryUpdate = {
              id: e.id,
              recordId: e.recordId,
              itemId: e.item.id,
              quantity: e.quantity,
              note: e.note,
            };
            this.ticketService.addEntry(entry);
          });
        },
        (err: any) => showError(err, this.toastr)
      );
      this.ticketService.getById(this.recordId).subscribe(
        (response) => {
          this.defaultType = response.data.ticketTypeId;
          this.formGroup.patchValue({
            title: response.data.title,
            description: response.data.description,
          });
        },
        (err: any) => showError(err, this.toastr)
      );
      setTimeout(() => {
        resolve();
      }, 600);
    });
  }

  removeItem(id: number) {
    let result = this.ticketService.removeEntry(id);

    if (result) {
      this.toastr.success('Remove item success', 'Success');
      this.getTableData();
      let entryCount = this.ticketService.getEntriesData()?.data.length;
      if (entryCount == 0) this.isHasData = false;
    } else this.toastr.error('Something went wrong', 'Error');
  }

  getItems() {
    const params: any = {
      index: 0,
      size: 0,
      searchKeyword: this.searchValue,
    };
    this.itemService.getItems(params).subscribe(
      (response) => {
        this.items = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  selectOption(e: any) {
    this.searchValue = e.option.value.name;
    this.openDialog(e.option.value.id);
  }

  getTicketType() {
    this.ticketService.getTicketType().subscribe(
      (response) => {
        this.ticketTypes = response.data;
      },
      (err) => showError(err, this.toastr)
    );
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
      this.ticketService.addEntry(result);
      this.getTableData();
    });
  }

  editDialog(detail: any): void {
    let entry: TicketEntryUpdate = {
      id: detail.id,
      recordId: detail.recordId,
      itemId: detail.item.id,
      quantity: detail.quantity,
      note: detail.note,
    };
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {
      data: entry,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ticketService.removeEntry(result.itemId);
      this.ticketService.addEntry(result);
      this.getTableData();
    });
  }

  clearData() {
    this.ticketService.removeEntries();
    this.formGroup.patchValue({
      title: '',
      description: '',
    });
    this.formGroup.value.title = '';
    this.formGroup.value.description = '';
    this.isHasData = false;
  }

  addTicket() {
    let ticket: TicketUpdate = {
      recordId: this.recordId,
      description: this.formGroup.value.description,
      title: this.formGroup.value.title,
      ticketTypeId: this.formGroup.value.type,
      ticketEntries: this.ticketService.getEntriesData()?.data!,
    };

    this.ticketService.createTicket(ticket).subscribe(
      (response) => {
        showMessage(response, this.toastr);
        this.router.navigate(['/ticket/entry/' + response.data.recordId]);
      },
      (err: any) => {
        showError(err, this.toastr);
      }
    );

    this.router.navigate(['/ticket']);
    this.clearData();
  }
}
