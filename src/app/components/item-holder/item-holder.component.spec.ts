import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHolderComponent } from './item-holder.component';

describe('ItemHolderComponent', () => {
  let component: ItemHolderComponent;
  let fixture: ComponentFixture<ItemHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemHolderComponent]
    });
    fixture = TestBed.createComponent(ItemHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
