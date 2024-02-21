import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DmKhoRoutingModule } from './dm-kho-routing.module';
import { DmKhoComponent } from './dm-kho.component';
import { AddDmKhoComponent } from './add-dm-kho/add-dm-kho.component';
import { EditDmKhoComponent } from './edit-dm-kho/edit-dm-kho.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    DmKhoComponent,
    AddDmKhoComponent,
    EditDmKhoComponent
  ],
  imports: [
    CommonModule,
    DmKhoRoutingModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class DmKhoModule { }
