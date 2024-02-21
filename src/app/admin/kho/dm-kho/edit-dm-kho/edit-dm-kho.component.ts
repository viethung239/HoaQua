import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DmkhoService } from '../../../../services/dmkho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dm-kho',
  templateUrl: './edit-dm-kho.component.html',
  styleUrl: './edit-dm-kho.component.scss'
})
export class EditDmKhoComponent {
  editDMKhoForm!: FormGroup;
  idDMKho: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private dmkhoService: DmkhoService,
    private snackBar: MatSnackBar, private router: Router) {
    this.idDMKho = null;

  }

  ngOnInit(): void {
    this.idDMKho = this.route.snapshot.paramMap.get('id');


    this.editDMKhoForm = this.fb.group({


      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],

      idDMKho: this.idDMKho,


      tenKho: ['', Validators.required],
      maKho: ['', Validators.required],
      kieuLoai: ['', Validators.required],

      isActive: ['true', Validators.required],


    });

    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idDMKho !== null) {
      this.dmkhoService.getDMKhoById(this.idDMKho).subscribe({
        next: (dmkhoData) => {
          if (dmkhoData) {
            this.ngayTaoOriginal = dmkhoData.ngayTao; // Lưu trữ giá trị ngayTao
            this.editDMKhoForm.patchValue({
              tenKho: dmkhoData.tenKho,
              maKho: dmkhoData.maKho,
              kieuLoai: dmkhoData.kieuLoai,
              isActive:dmkhoData.isActive
            });
          } else {
            console.error('Không tìm thấy chi nhánh với id:', this.idDMKho);
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
    if (this.editDMKhoForm.valid && this.idDMKho !== null) {
      const updatedData = {
        ...this.editDMKhoForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.dmkhoService.updateDMKho(this.idDMKho, updatedData).subscribe({
        next: () => {
          console.log('Cập nhật danh mục kho thành công');
          this.snackBar.open('Sửa danh mục kho thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/kho/danh-muc-kho']);
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
