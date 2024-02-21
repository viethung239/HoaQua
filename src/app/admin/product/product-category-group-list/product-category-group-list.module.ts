import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryGroupListRoutingModule } from './product-category-group-list-routing.module';
import { ProductCategoryGroupListComponent } from './product-category-group-list.component';
import { AddProductGroupCategoryListComponent } from './add-product-group-category-list/add-product-group-category-list.component';
import { EditProductGroupCategoryListComponent } from './edit-product-group-category-list/edit-product-group-category-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ProductCategoryGroupListComponent,
    AddProductGroupCategoryListComponent,
    EditProductGroupCategoryListComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryGroupListRoutingModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class ProductCategoryGroupListModule { }
