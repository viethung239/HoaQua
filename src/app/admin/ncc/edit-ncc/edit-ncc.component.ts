import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NccService } from '../../../services/ncc.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-ncc',
  templateUrl: './edit-ncc.component.html',
  styleUrl: './edit-ncc.component.scss'
})
export class EditNccComponent {
  editNccForm!: FormGroup;
  idNhaCungCap: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private nccService: NccService, private snackBar: MatSnackBar, private router: Router) {
    this.idNhaCungCap = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {
    this.idNhaCungCap = this.route.snapshot.paramMap.get('id');


    this.editNccForm = this.fb.group({


      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],

      idNhaCungCap: this.idNhaCungCap,


      tenNhaCung: ['', Validators.required],
      nguoiLienHe: ['', Validators.required],
      sdtNguoiLienHe: ['', Validators.required],
      diaChi: ['', Validators.required],
      email: ['', Validators.required],
      suDung: ['true', Validators.required],


    });

    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idNhaCungCap !== null) {
      this.nccService.getNCCById(this.idNhaCungCap).subscribe({
        next: (nccData) => {
          if (nccData) {
            this.ngayTaoOriginal = nccData.ngayTao; // Lưu trữ giá trị ngayTao
            this.editNccForm.patchValue({
              tenNhaCung: nccData.tenNhaCung,
              nguoiLienHe: nccData.nguoiLienHe,
              sdtNguoiLienHe: nccData.sdtNguoiLienHe,
              diaChi: nccData.diaChi,
              email: nccData.email,
              suDung:nccData.suDung
            });
          } else {
            console.error('Không tìm thấy chi nhánh với id:', this.idNhaCungCap);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu chi nhánh với idChiNhanh là null.');
    }
  }


  onSubmit() {
    if (this.editNccForm.valid && this.idNhaCungCap !== null) {
      const updatedNCC = {
        ...this.editNccForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.nccService.updateNCC(this.idNhaCungCap, updatedNCC).subscribe({
        next: () => {
          console.log('Cập nhật nhà cung cấp thành công');
          this.snackBar.open('Sửa nhà cung cấp thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nha-cung-cap']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Không thể cập nhật nhà cung cấp là null.');
    }
  }
}
