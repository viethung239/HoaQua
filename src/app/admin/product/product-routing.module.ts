
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductCategoryGroupListComponent } from './product-category-group-list/product-category-group-list.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';

const routes: Routes = [
  {
    path: 'danh-sach-san-pham',
    component: ProductComponent
  },
  {
    path: 'danh-sach-san-pham/sua-san-pham/:id',
    component: EditproductComponent
  },
  {
    path: 'danh-sach-san-pham/them-san-pham',
    component: AddproductComponent
  },
  {
    path: 'danh-sach-san-pham/chi-tiet-san-pham/:id',
    component: ProductdetailsComponent
  },
  {
    path: 'danh-sach-danh-muc-san-pham',
    loadChildren:() =>import('./product-category-list/product-category-list.module').then(b => b.ProductCategoryListModule )
  },
  {
    path: 'danh-sach-nhom-danh-muc-san-pham',

    loadChildren:() =>import('./product-category-group-list/product-category-group-list.module').then(b => b.ProductCategoryGroupListModule )
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
