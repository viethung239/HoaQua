import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDmKhoComponent } from './edit-dm-kho.component';

describe('EditDmKhoComponent', () => {
  let component: EditDmKhoComponent;
  let fixture: ComponentFixture<EditDmKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDmKhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDmKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
