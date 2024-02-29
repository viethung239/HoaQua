import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonHangComponent } from './don-hang.component';
import { ThemDonHangComponent } from './them-don-hang/them-don-hang.component';



const routes: Routes = [
 /*

  {
    path: 'sua-chi-nhanh/:id',
    component: EditbranchComponent
  },*/
  {
    path: 'danh-sach-don-hang/them-don-hang',
    component: ThemDonHangComponent
  },
  {path:'danh-sach-don-hang', component: DonHangComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonHangRoutingModule { }
