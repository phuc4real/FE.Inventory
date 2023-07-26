import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCatalogDialogComponent } from './update-catalog-dialog.component';

describe('UpdateCatalogDialogComponent', () => {
  let component: UpdateCatalogDialogComponent;
  let fixture: ComponentFixture<UpdateCatalogDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCatalogDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateCatalogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
