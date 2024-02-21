import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'danh-sach-nguoi-dung',
    component: UserComponent
  },
  {
    path: 'danh-sach-nguoi-dung/sua-nguoi-dung/:id',
    component: EditUserComponent
  },
  {
    path: 'danh-sach-nguoi-dung/them-nguoi-dung',
    component: AddUserComponent
  },
  {
    path: 'danh-sach-nguoi-dung/chi-tiet-nguoi-dung/:id',
    component: UserDetailsComponent
  },
  {
    path: 'quyen',
    loadChildren:() =>import('./user-role/user-role.module').then(b => b.UserRoleModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
