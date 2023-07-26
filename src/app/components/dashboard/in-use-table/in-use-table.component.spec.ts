import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InUseTableComponent } from './in-use-table.component';

describe('UsingItemTableComponent', () => {
  let component: InUseTableComponent;
  let fixture: ComponentFixture<InUseTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InUseTableComponent],
    });
    fixture = TestBed.createComponent(InUseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
