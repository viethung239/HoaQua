import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { KhoService } from '../../../../services/kho.service';
import { KhoctService } from '../../../../services/khoct.service';
import { NccService } from '../../../../services/ncc.service';
import { DmkhoService } from '../../../../services/dmkho.service';
import { ProductService } from '../../../../services/product.service';
import { BranchService } from '../../../../services/branch.service';

@Component({
  selector: 'app-edit-kho-details',
  templateUrl: './edit-kho-details.component.html',
  styleUrl: './edit-kho-details.component.scss'
})
export class EditKhoDetailsComponent {
  SanPham: any[] =[];
  ChiNhanh: any[] =[];
  Kho: any[] = [];
  DMKho: any[] =[];
  NCC: any[] = [];
  editKhoCTForm!: FormGroup;
  idKhoChiTiet: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar,
     private router: Router,
     private khoService: KhoService,
     private khodetailService: KhoctService,
     private nccService:NccService,
     private dmkhoService:DmkhoService,
     private productService: ProductService,
     private branchService:BranchService,
     ) {
    this.idKhoChiTiet = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {

    this.khoService.getListKho().subscribe({
      next: (data: any) => {
        this.Kho = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.nccService.getListNCC().subscribe({
      next: (data: any) => {
        this.NCC = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.dmkhoService.getListDMKho().subscribe({
      next: (data: any) => {
        this.DMKho = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.SanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.ChiNhanh = data;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });

    this.idKhoChiTiet = this.route.snapshot.paramMap.get('id');
    this.editKhoCTForm = this.fb.group({


      idKhoChiTiet: this.idKhoChiTiet,
      idKho:  ['', Validators.required],
      idDMKho:  ['', Validators.required],
      idChiNhanh: ['', Validators.required],
      idSanPham:  ['', Validators.required],
      idNhaCungCap:  ['', Validators.required],
      soLuong:  ['', Validators.required],
      giaNhapTrungBinh:  ['', Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idKhoChiTiet !== null) {
      this.khodetailService.getKhoCTById(this.idKhoChiTiet).subscribe({
        next: (khoctData) => {
          if (khoctData) {
            this.ngayTaoOriginal = khoctData.ngayTao;
            this.editKhoCTForm.patchValue({
              soLuong: khoctData.soLuong,
              idKho:  khoctData.idKho,
              idDMKho: khoctData.idDMKho,
              idChiNhanh: khoctData.idChiNhanh,
              idSanPham:  khoctData.idSanPham,
              idNhaCungCap: khoctData.idNhaCungCap,
              giaNhapTrungBinh: khoctData.giaNhapTrungBinh,

            });
          } else {
            console.error('Không tìm thấy kho chi tiet  với id:', this.idKhoChiTiet);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu kho chi tiet  là null.');
    }
  }


  onSubmit() {
    if (!this.idKhoChiTiet) {
      console.error('Không thể cập nhật kho chi tiet là null.');
      return;
    }

    if (this.editKhoCTForm.valid) {
      const updatedKhoChiTiet = {
        ...this.editKhoCTForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.khodetailService.updateKhoCT(this.idKhoChiTiet,  updatedKhoChiTiet).subscribe({
        next: () => {
          console.log('Cập nhật kho chi tiết thành công');
          this.snackBar.open('Sửa kho chi tiết thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/kho/kho-chi-tiet']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');

    }
  }
}
