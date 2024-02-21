import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KhoRoutingModule } from './kho-routing.module';
import { AddKhoComponent } from './add-kho/add-kho.component';
import { EditKhoComponent } from './edit-kho/edit-kho.component';
import { KhoComponent } from './kho.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    KhoComponent,
    AddKhoComponent,
    EditKhoComponent,

  ],
  imports: [
    CommonModule,
    KhoRoutingModule,
    MatIconModule,
    MatPaginator,
    MatPaginator,
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
export class KhoModule { }
