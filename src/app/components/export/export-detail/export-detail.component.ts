import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportEntry } from 'src/app/models';
import { ExportService } from 'src/app/services';
import { FormatDate, showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.css'],
})
export class ExportDetailComponent {
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
        // this.tableData = new MatTableDataSource<ExportDetail>(response.data.details);
        this.formGroup.patchValue({
          id: response.data.id,
          description: response.data.description,
          status: response.data.status,
          forUser: response.data.exportFor,
          createdDate: FormatDate(response.data.createdAt),
          createdByUser: response.data.createdBy,
          updatedDate: FormatDate(response.data.updatedAt),
          updatedByUser: response.data.updatedBy,
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
