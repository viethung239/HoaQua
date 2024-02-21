import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKhoComponent } from './dm-kho.component';

describe('DmKhoComponent', () => {
  let component: DmKhoComponent;
  let fixture: ComponentFixture<DmKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmKhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
