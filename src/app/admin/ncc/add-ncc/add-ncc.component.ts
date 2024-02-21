import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NccService } from '../../../services/ncc.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ncc',
  templateUrl: './add-ncc.component.html',
  styleUrl: './add-ncc.component.scss'
})
export class AddNccComponent {
  addNccForm: FormGroup;

  constructor(private fb: FormBuilder, private nccService: NccService, private router: Router, private snackBar: MatSnackBar) {
    this.addNccForm = this.fb.group({
      tenNhaCung: ['', Validators.required],
      nguoiLienHe: ['', Validators.required],
      sdtNguoiLienHe: ['', Validators.required],
      diaChi: ['', Validators.required],
      email: ['', Validators.required],
      suDung: ['true', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required]
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    // Chuyển định dạng ngày giờ theo ISO
    return now.toISOString();
  }

  onSubmit() {
    if (this.addNccForm.valid) {
      const newNCC = this.addNccForm.value;
      this.nccService.addNCC(newNCC).subscribe({
        next: () => {

          console.log('Thêm nhà cung cấp thành công');
          this.snackBar.open('Thêm nhà cung cấp thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nha-cung-cap']);
        },
        error: (error) => {
          console.error('Error adding branch:', error);
        }
      });
    }
  }
}
