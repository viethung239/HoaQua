import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmKhoComponent } from './dm-kho.component';
import { AddDmKhoComponent } from './add-dm-kho/add-dm-kho.component';
import { EditDmKhoComponent } from './edit-dm-kho/edit-dm-kho.component';

const routes: Routes = [
  {
    path: '',
    component:DmKhoComponent
  },
  {path:'', redirectTo:'danh-muc-kho',pathMatch:'full'},
  {
    path: 'them-danh-muc-kho',
    component: AddDmKhoComponent
  },
  {
    path: 'sua-danh-muc-kho/:id',
    component:EditDmKhoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmKhoRoutingModule { }
