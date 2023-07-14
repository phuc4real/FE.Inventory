import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExportDialogComponent } from './add-export-dialog.component';

describe('AddExportDialogComponent', () => {
  let component: AddExportDialogComponent;
  let fixture: ComponentFixture<AddExportDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExportDialogComponent]
    });
    fixture = TestBed.createComponent(AddExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
