import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNccComponent } from './add-ncc.component';

describe('AddNccComponent', () => {
  let component: AddNccComponent;
  let fixture: ComponentFixture<AddNccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNccComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
