import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NccRoutingModule } from './ncc-routing.module';
import { AddNccComponent } from './add-ncc/add-ncc.component';
import { EditNccComponent } from './edit-ncc/edit-ncc.component';
import { NccComponent } from './ncc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    NccComponent,
    AddNccComponent,
    EditNccComponent
  ],
  imports: [
    CommonModule,
    NccRoutingModule,
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
export class NccModule { }
