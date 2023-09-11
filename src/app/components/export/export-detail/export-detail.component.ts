import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportDetail } from 'src/app/models';
import { ExportService } from 'src/app/services';
import {
  showError,
  showMessage,
  toStringFormatDate,
} from 'src/app/share/helpers';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.css'],
})
export class ExportDetailComponent {
  id!: number;
  formGroup!: FormGroup;
  tableData = new MatTableDataSource<ExportDetail>();
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
      forUser: new FormControl(''),
      createdDate: new FormControl(''),
      createdByUser: new FormControl(''),
      updatedDate: new FormControl(''),
      updatedByUser: new FormControl(''),
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
        this.tableData = new MatTableDataSource<ExportDetail>(response.details);
        this.formGroup.patchValue({
          id: response.id,
          description: response.description,
          status: response.status,
          forUser: response.forUser.userName,
          createdDate: toStringFormatDate(response.createdDate),
          createdByUser: response.createdByUser.userName,
          updatedDate: toStringFormatDate(response.updatedDate),
          updatedByUser: response.updatedByUser.userName,
        });
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  updateStatus() {
    this.exportService.updateStatus(this.id).subscribe(
      (response) => showMessage(response, this.toastr),
      (err: any) => showError(err, this.toastr)
    );
  }
}
