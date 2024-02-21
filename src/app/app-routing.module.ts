import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';



const routes: Routes = [
  /*{path:'', redirectTo:'admin/trang-chu',pathMatch:'full'},

  {path:'admin/trang-chu', component: DashboardComponent},
  {
    path: 'admin/san-pham',
    loadChildren: () => import('./admin/product/product.module').then(m => m.ProductModule)
  },
  {path:'admin/chi-nhanh',
    loadChildren:() =>import('./admin/branch/branch.module').then(b => b.BranchModule )
  },
  {path:'admin/nha-cung-cap',
  loadChildren:() =>import('./admin/ncc/ncc.module').then(n => n.NccModule )
  },
  {path:'admin/nguoi-dung',
  loadChildren:() =>import('./admin/user/user.module').then(u => u.UserModule )
  },
  {path:'admin/kho',
  loadChildren:() =>import('./admin/kho/kho.module').then(k => k.KhoModule )
  },
  {path:'login', component: LoginComponent},*/
  {
    path: '',
    component: LayoutAdminComponent, // Sử dụng layout mới cho trang đăng nhập
    children: [
      {
        path: 'admin/trang-chu',
        component: DashboardComponent // Component đăng nhập sẽ được hiển thị trong layout mới
      },
      {
        path: 'admin/san-pham',
        loadChildren: () => import('./admin/product/product.module').then(m => m.ProductModule)
      },
      {
        path:'admin/chi-nhanh',
        loadChildren:() =>import('./admin/branch/branch.module').then(b => b.BranchModule )
      },
      {
        path:'admin/nha-cung-cap',
        loadChildren:() =>import('./admin/ncc/ncc.module').then(n => n.NccModule )
      },
      {
        path:'admin/nguoi-dung',
        loadChildren:() =>import('./admin/user/user.module').then(u => u.UserModule )
      },
      {
        path:'admin/kho',
        loadChildren:() =>import('./admin/kho/kho.module').then(k => k.KhoModule )
      },
    ]
  },
  {
    path:'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
