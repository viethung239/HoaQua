import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KhoDetailsComponent } from './kho-details.component';
import { EditKhoDetailsComponent } from './edit-kho-details/edit-kho-details.component';
import { AddKhoDetailsComponent } from './add-kho-details/add-kho-details.component';
import { WKhoDetailsComponent } from './w-kho-details/w-kho-details.component';

const routes: Routes = [
  {
    path: '',
    component:KhoDetailsComponent
  },
  {path:'', redirectTo:'kho-chi-tiet',pathMatch:'full'},
  {
    path: 'sua-kho-chi-tiet/:id',
    component: EditKhoDetailsComponent
  },
  {
    path: 'them-kho-chi-tiet',
    component: AddKhoDetailsComponent
  },
  {
    path: 'chi-tiet-kho/:id',
    component: WKhoDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhoDetailsRoutingModule { }
