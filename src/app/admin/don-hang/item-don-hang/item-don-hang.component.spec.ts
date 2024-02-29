import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDonHangComponent } from './item-don-hang.component';

describe('ItemDonHangComponent', () => {
  let component: ItemDonHangComponent;
  let fixture: ComponentFixture<ItemDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDonHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
