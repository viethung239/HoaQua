import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDmKhoComponent } from './add-dm-kho.component';

describe('AddDmKhoComponent', () => {
  let component: AddDmKhoComponent;
  let fixture: ComponentFixture<AddDmKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDmKhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDmKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
