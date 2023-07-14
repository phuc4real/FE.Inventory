import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExportDialogData, User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { showError } from 'src/app/share/helpers/toastr-helper';

@Component({
  selector: 'app-add-export-dialog',
  templateUrl: './add-export-dialog.component.html',
  styleUrls: ['./add-export-dialog.component.css'],
})
export class AddExportDialogComponent {
  searchValue = '';
  users!: User[];
  constructor(
    public dialogRef: MatDialogRef<AddExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExportDialogData,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  getUser() {
    let params: any = {
      name: this.searchValue,
    };
    this.userService.getList(params).subscribe(
      (values) => {
        this.users = values;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  selectOption(e: any) {
    this.searchValue = e.option.value.userName;
    this.data.userId = e.option.value.id;
  }
}
