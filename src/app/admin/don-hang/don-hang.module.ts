import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonHangRoutingModule } from './don-hang-routing.module';
import { DonHangComponent } from './don-hang.component';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ThemDonHangComponent } from './them-don-hang/them-don-hang.component';
import { ItemDonHangComponent } from './item-don-hang/item-don-hang.component';

import { FormsModule} from '@angular/forms';
import { ChiTietDonHangComponent } from './chi-tiet-don-hang/chi-tiet-don-hang.component'
@NgModule({
  declarations: [
    DonHangComponent,
    ThemDonHangComponent,
    ItemDonHangComponent,
    ChiTietDonHangComponent

  ],
  imports: [
    CommonModule,
    DonHangRoutingModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,

  ]
})
export class DonHangModule { }
