import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingItemTableComponent } from './using-item-table.component';

describe('UsingItemTableComponent', () => {
  let component: UsingItemTableComponent;
  let fixture: ComponentFixture<UsingItemTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsingItemTableComponent]
    });
    fixture = TestBed.createComponent(UsingItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
