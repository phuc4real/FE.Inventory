import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExportComponent } from './list-export.component';

describe('ListExportComponent', () => {
  let component: ListExportComponent;
  let fixture: ComponentFixture<ListExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListExportComponent]
    });
    fixture = TestBed.createComponent(ListExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
