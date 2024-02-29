import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDonHangComponent } from './them-don-hang.component';

describe('ThemDonHangComponent', () => {
  let component: ThemDonHangComponent;
  let fixture: ComponentFixture<ThemDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemDonHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
