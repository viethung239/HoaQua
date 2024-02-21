import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KhoService } from '../../../services/kho.service';
import { BranchService } from '../../../services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-kho',
  templateUrl: './edit-kho.component.html',
  styleUrl: './edit-kho.component.scss'
})
export class EditKhoComponent {
  Branch: any[] =[];
  editKhoForm!: FormGroup;
  idKho: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,
     private khoService: KhoService, private branchService: BranchService,
     private snackBar: MatSnackBar, private router: Router) {
    this.idKho = null;

  }

  ngOnInit(): void {

    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.Branch = data;
      },
      error: (error: any) => {
        console.error('Error fetching branch:', error);
      }
    });

    this.idKho = this.route.snapshot.paramMap.get('id');
    this.editKhoForm= this.fb.group({

      tenKho: ['', Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      idKho: this.idKho,
      idChiNhanh: ['', Validators.required],



    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idKho !== null) {
      this.khoService.getKhoById(this.idKho).subscribe({
        next: (khoData) => {
          if (khoData) {
            this.ngayTaoOriginal = khoData.ngayTao;
            this.editKhoForm.patchValue({
              tenKho: khoData.tenKho,
              idChiNhanh: khoData.idChiNhanh,



            });
          } else {
            console.error('Không tìm thấy danh mục sản phẩm  với id:', this.idKho);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu danh mục sản phẩm  với idDMSanPham là null.');
    }
  }


  onSubmit() {
    if (!this.idKho) {
      console.error('Không thể cập nhật sản phẩm với id danh mục sản phẩm là null.');
      return;
    }

    if (this.editKhoForm.valid) {
      const updatedData = {
        ...this.editKhoForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.khoService.updateKho(this.idKho, updatedData).subscribe({
        next: () => {
          console.log('Cập nhật kho thành công');
          this.snackBar.open('Sửa kho thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/kho/danh-sach-kho']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');
      // Hiển thị thông báo lỗi cho người dùng nếu cần
    }
  }
}
