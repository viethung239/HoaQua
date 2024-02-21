import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKhoDetailsComponent } from './add-kho-details.component';

describe('AddKhoDetailsComponent', () => {
  let component: AddKhoDetailsComponent;
  let fixture: ComponentFixture<AddKhoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKhoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKhoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
