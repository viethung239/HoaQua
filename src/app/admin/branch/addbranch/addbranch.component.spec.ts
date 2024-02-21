import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbranchComponent } from './addbranch.component';

describe('AddbranchComponent', () => {
  let component: AddbranchComponent;
  let fixture: ComponentFixture<AddbranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddbranchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
