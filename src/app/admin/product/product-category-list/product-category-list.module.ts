import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryListRoutingModule } from './product-category-list-routing.module';
import { ProductCategoryListComponent } from './product-category-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditProductCategoryListComponent } from './edit-product-category-list/edit-product-category-list.component';
import { AddProductCategoryListComponent } from './add-product-category-list/add-product-category-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ProductCategoryListComponent,
    EditProductCategoryListComponent,
    AddProductCategoryListComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryListRoutingModule,
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
export class ProductCategoryListModule { }
