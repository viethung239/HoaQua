import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNccComponent } from './edit-ncc.component';

describe('EditNccComponent', () => {
  let component: EditNccComponent;
  let fixture: ComponentFixture<EditNccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNccComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
