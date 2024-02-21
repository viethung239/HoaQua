import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NccComponent } from './ncc.component';
import { AddNccComponent } from './add-ncc/add-ncc.component';
import { EditNccComponent } from './edit-ncc/edit-ncc.component';

const routes: Routes = [
  {path:'', component: NccComponent},
  {
    path: 'them-nha-cung-cap',
    component: AddNccComponent
  },
  {
    path: 'sua-nha-cung-cap/:id',
    component: EditNccComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NccRoutingModule { }
