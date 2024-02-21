import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KhoDetailsRoutingModule } from './kho-details-routing.module';
import { KhoDetailsComponent } from './kho-details.component';
import { AddKhoDetailsComponent } from './add-kho-details/add-kho-details.component';
import { EditKhoDetailsComponent } from './edit-kho-details/edit-kho-details.component';
import { WKhoDetailsComponent } from './w-kho-details/w-kho-details.component';
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
    KhoDetailsComponent,
    AddKhoDetailsComponent,
    EditKhoDetailsComponent,
    WKhoDetailsComponent
  ],
  imports: [
    CommonModule,
    KhoDetailsRoutingModule,
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
export class KhoDetailsModule { }
