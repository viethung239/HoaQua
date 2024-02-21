import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductGroupCategoryListComponent } from './edit-product-group-category-list.component';

describe('EditProductGroupCategoryListComponent', () => {
  let component: EditProductGroupCategoryListComponent;
  let fixture: ComponentFixture<EditProductGroupCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductGroupCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductGroupCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
