import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryListComponent } from './product-category-list.component';
import { EditProductCategoryListComponent } from './edit-product-category-list/edit-product-category-list.component';
import { AddProductCategoryListComponent } from './add-product-category-list/add-product-category-list.component';

const routes: Routes = [
  {
    path: '',
    component:ProductCategoryListComponent
  },
  {path:'', redirectTo:'danh-sach-danh-muc-san-pham',pathMatch:'full'},
  {
    path: 'sua-danh-muc-san-pham/:id',
    component: EditProductCategoryListComponent
  },
  {
    path: 'them-danh-muc-san-pham',
    component: AddProductCategoryListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryListRoutingModule { }
