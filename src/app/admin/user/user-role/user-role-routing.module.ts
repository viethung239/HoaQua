import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleComponent } from './user-role.component';
import { AddUserRoleComponent } from './add-user-role/add-user-role.component';
import { EditUserRoleComponent } from './edit-user-role/edit-user-role.component';

const routes: Routes = [
  {
    path: '',
    component:UserRoleComponent
  },
  {path:'', redirectTo:'quyen',pathMatch:'full'},
  {
    path: 'them-quyen',
    component: AddUserRoleComponent
  },
  {
    path: 'sua-quyen/:id',
    component: EditUserRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }
