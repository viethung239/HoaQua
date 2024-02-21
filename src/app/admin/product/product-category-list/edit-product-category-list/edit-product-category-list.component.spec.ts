import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductCategoryListComponent } from './edit-product-category-list.component';

describe('EditProductCategoryListComponent', () => {
  let component: EditProductCategoryListComponent;
  let fixture: ComponentFixture<EditProductCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
