import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { BodyComponent } from './admin/body/body.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { SublevelMenuComponent } from './admin/sidenav/sublevel-menu.component';
import { HeaderComponent } from './admin/header/header.component';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './admin/login/login.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { FormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DonHangComponent } from './admin/don-hang/don-hang.component';












@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,

    SublevelMenuComponent,
      HeaderComponent,
      LoginComponent,
      LayoutAdminComponent,








  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,


  ],
  providers: [
   // provideClientHydration()
   [provideHttpClient(withFetch()),JwtHelperService],
   { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
