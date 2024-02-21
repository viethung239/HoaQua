import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ProductCategoryGroupListComponent } from './product-category-group-list/product-category-group-list.component';
import { MatInputModule } from '@angular/material/input';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ProductComponent,

    AddproductComponent,
    EditproductComponent,
    ProductdetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule

  ]
})
export class ProductModule { }
