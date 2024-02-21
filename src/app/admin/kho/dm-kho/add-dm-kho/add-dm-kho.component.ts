import { Component } from '@angular/core';
import { DmkhoService } from '../../../../services/dmkho.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dm-kho',
  templateUrl: './add-dm-kho.component.html',
  styleUrl: './add-dm-kho.component.scss'
})
export class AddDmKhoComponent {
  addDMKhoForm: FormGroup;

  constructor(private fb: FormBuilder, private dmkhoService: DmkhoService, private router: Router, private snackBar: MatSnackBar) {
    this.addDMKhoForm = this.fb.group({
      tenKho: ['', Validators.required],
      maKho: ['', Validators.required],
      kieuLoai: ['', Validators.required],
      isActive: ['true', Validators.required],
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
    if (this.addDMKhoForm.valid) {
      const newDMkho = this.addDMKhoForm.value;
      this.dmkhoService.addDMKho(newDMkho).subscribe({
        next: () => {

          console.log('Thêm danh mục kho thành công');
          this.snackBar.open('Thêm danh mục kho thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/kho/danh-muc-kho']);
        },
        error: (error) => {
          console.error('Error adding dmkho:', error);
        }
      });
    }
  }
}
