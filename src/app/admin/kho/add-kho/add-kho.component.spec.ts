import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKhoComponent } from './add-kho.component';

describe('AddKhoComponent', () => {
  let component: AddKhoComponent;
  let fixture: ComponentFixture<AddKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
