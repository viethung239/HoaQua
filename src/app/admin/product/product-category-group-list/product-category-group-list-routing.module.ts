import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryGroupListComponent } from './product-category-group-list.component';
import { EditProductGroupCategoryListComponent } from './edit-product-group-category-list/edit-product-group-category-list.component';
import { AddProductGroupCategoryListComponent } from './add-product-group-category-list/add-product-group-category-list.component';

const routes: Routes = [
  {
    path: '',
    component:ProductCategoryGroupListComponent
  },
  {path:'', redirectTo:'danh-sach-nhom-danh-muc-san-pham',pathMatch:'full'},
  {
    path: 'sua-nhom-danh-muc-san-pham/:id',
    component:  EditProductGroupCategoryListComponent
  },
  {
    path: 'them-nhom-danh-muc-san-pham',
    component: AddProductGroupCategoryListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryGroupListRoutingModule { }
