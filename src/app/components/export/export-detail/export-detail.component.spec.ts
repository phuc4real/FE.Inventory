import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDetailComponent } from './export-detail.component';

describe('ExportDetailComponent', () => {
  let component: ExportDetailComponent;
  let fixture: ComponentFixture<ExportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportDetailComponent]
    });
    fixture = TestBed.createComponent(ExportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
