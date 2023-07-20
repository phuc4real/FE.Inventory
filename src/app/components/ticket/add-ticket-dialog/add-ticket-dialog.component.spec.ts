import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketDialogComponent } from './add-ticket-dialog.component';

describe('AddTicketDialogComponent', () => {
  let component: AddTicketDialogComponent;
  let fixture: ComponentFixture<AddTicketDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTicketDialogComponent]
    });
    fixture = TestBed.createComponent(AddTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
