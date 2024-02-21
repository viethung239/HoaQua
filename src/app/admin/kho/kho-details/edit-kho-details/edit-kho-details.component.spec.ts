import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKhoDetailsComponent } from './edit-kho-details.component';

describe('EditKhoDetailsComponent', () => {
  let component: EditKhoDetailsComponent;
  let fixture: ComponentFixture<EditKhoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditKhoDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditKhoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
