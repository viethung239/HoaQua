import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoDetailsComponent } from './kho-details.component';

describe('KhoDetailsComponent', () => {
  let component: KhoDetailsComponent;
  let fixture: ComponentFixture<KhoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KhoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KhoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
