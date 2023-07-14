import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportDetail } from 'src/app/models';
import { ExportService } from 'src/app/services';
import { showError, toStringFormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.css'],
})
export class ExportDetailComponent {
  formGroup!: FormGroup;
  Id!: number;
  tableData = new MatTableDataSource<ExportDetail>();
  data!: ExportDetail[];
  displayedColumns: string[] = ['itemImage', 'itemName', 'quantity', 'forUser'];

  constructor(
    private route: ActivatedRoute,
    private exportService: ExportService,
    private toastr: ToastrService
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      createdDate: new FormControl(''),
      createdByUser: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.Id = params['id'];
    });
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.exportService.getById(this.Id).subscribe(
      (response) => {
        this.data = response.details;
        this.tableData = new MatTableDataSource<ExportDetail>(this.data);
        this.formGroup.patchValue({
          id: response.id,
          createdDate: toStringFormatDate(response.createdDate),
          createdByUser: response.createdByUser.userName,
          description: response.description,
        });
      },
      (err: any) => showError(err, this.toastr)
    );
  }
}
