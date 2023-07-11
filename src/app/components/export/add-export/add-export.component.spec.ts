import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExportComponent } from './add-export.component';

describe('AddExportComponent', () => {
  let component: AddExportComponent;
  let fixture: ComponentFixture<AddExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExportComponent]
    });
    fixture = TestBed.createComponent(AddExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
