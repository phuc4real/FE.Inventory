import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailComponent } from './receipt-detail.component';

describe('ReceiptDetailComponent', () => {
  let component: ReceiptDetailComponent;
  let fixture: ComponentFixture<ReceiptDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptDetailComponent]
    });
    fixture = TestBed.createComponent(ReceiptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
