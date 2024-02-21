import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbranchComponent } from './addbranch/addbranch.component';
import { BranchComponent } from './branch.component';
import { EditbranchComponent } from './editbranch/editbranch.component';

const routes: Routes = [
  {
    path: 'them-chi-nhanh',
    component: AddbranchComponent
  },
  {
    path: 'sua-chi-nhanh/:id',
    component: EditbranchComponent
  },
  {path:'', component: BranchComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
