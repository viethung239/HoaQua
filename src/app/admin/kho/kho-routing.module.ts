import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KhoComponent } from './kho.component';
import { EditKhoComponent } from './edit-kho/edit-kho.component';
import { AddKhoComponent } from './add-kho/add-kho.component';

const routes: Routes = [

  {
    path: 'danh-sach-kho',
    component: KhoComponent
  },
  {
    path: 'danh-sach-kho/sua-kho/:id',
    component: EditKhoComponent
  },
  {
    path: 'danh-sach-kho/them-kho',
    component: AddKhoComponent
  },
  {
    path: 'danh-muc-kho',
    loadChildren:() =>import('./dm-kho/dm-kho.module').then(b => b.DmKhoModule )
  },
  {
    path: 'kho-chi-tiet',
    loadChildren:() =>import('./kho-details/kho-details.module').then(b => b.KhoDetailsModule )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhoRoutingModule { }
