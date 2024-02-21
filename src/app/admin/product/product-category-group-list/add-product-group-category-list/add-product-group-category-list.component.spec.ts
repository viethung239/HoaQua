import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductGroupCategoryListComponent } from './add-product-group-category-list.component';

describe('AddProductGroupCategoryListComponent', () => {
  let component: AddProductGroupCategoryListComponent;
  let fixture: ComponentFixture<AddProductGroupCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductGroupCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductGroupCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
