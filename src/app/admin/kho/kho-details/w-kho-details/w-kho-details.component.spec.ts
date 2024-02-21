import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WKhoDetailsComponent } from './w-kho-details.component';

describe('WKhoDetailsComponent', () => {
  let component: WKhoDetailsComponent;
  let fixture: ComponentFixture<WKhoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WKhoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WKhoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
