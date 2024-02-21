import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductCategoryListComponent } from './add-product-category-list.component';

describe('AddProductCategoryListComponent', () => {
  let component: AddProductCategoryListComponent;
  let fixture: ComponentFixture<AddProductCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
