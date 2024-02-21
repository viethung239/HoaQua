import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryGroupListComponent } from './product-category-group-list.component';

describe('ProductCategoryGroupListComponent', () => {
  let component: ProductCategoryGroupListComponent;
  let fixture: ComponentFixture<ProductCategoryGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryGroupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCategoryGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
