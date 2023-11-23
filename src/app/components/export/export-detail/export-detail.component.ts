import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportEntry, StatusCheck } from 'src/app/models';
import { ExportService } from 'src/app/services';
import {
  FormatDate,
  checkStatusOperation,
  showError,
  showMessage,
} from 'src/app/share/helpers';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.css'],
})
export class ExportDetailComponent {
  statusCheck!: StatusCheck;
  id!: number;
  formGroup!: FormGroup;
  tableData = new MatTableDataSource<ExportEntry>();
  displayedColumns: string[] = ['itemImage', 'itemName', 'quantity', 'note'];

  constructor(
    private route: ActivatedRoute,
    private exportService: ExportService,
    private toastr: ToastrService
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      exportFor: new FormControl(''),
      createdAt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedAt: new FormControl(''),
      updatedBy: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.exportService.getById(this.id).subscribe(
      (response) => {
        this.statusCheck = checkStatusOperation(response.data.status);
        this.formGroup.patchValue({
          id: response.data.id,
          description: response.data.description,
          status: response.data.status,
          exportFor: response.data.exportFor,
          createdAt: FormatDate(response.data.createdAt),
          createdBy: response.data.createdBy,
          updatedAt: FormatDate(response.data.updatedAt),
          updatedBy: response.data.updatedBy,
        });
      },
      (err: any) => showError(err, this.toastr)
    );

    this.exportService.getExportEntries(this.id).subscribe(
      (response) => {
        console.log(response);

        this.tableData = new MatTableDataSource<ExportEntry>(response.data);
      },
      (err) => showError(err, this.toastr)
    );
  }

  updateStatus() {
    this.exportService.updateStatus(this.id).subscribe(
      (response) => showMessage(response, this.toastr),
      (err: any) => showError(err, this.toastr)
    );
  }
}
