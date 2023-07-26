import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogDialogData } from 'src/app/models';

@Component({
  selector: 'app-update-catalog-dialog',
  templateUrl: './update-catalog-dialog.component.html',
  styleUrls: ['./update-catalog-dialog.component.css'],
})
export class UpdateCatalogDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateCatalogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CatalogDialogData
  ) {}
  close(): void {
    this.dialogRef.close();
  }
}
