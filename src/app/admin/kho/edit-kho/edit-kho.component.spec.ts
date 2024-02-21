import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKhoComponent } from './edit-kho.component';

describe('EditKhoComponent', () => {
  let component: EditKhoComponent;
  let fixture: ComponentFixture<EditKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditKhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
