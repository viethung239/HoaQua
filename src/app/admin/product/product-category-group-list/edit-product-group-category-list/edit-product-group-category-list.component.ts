import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NdmproductService } from '../../../../services/ndmproduct.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-edit-product-group-category-list',
  templateUrl: './edit-product-group-category-list.component.html',
  styleUrl: './edit-product-group-category-list.component.scss'
})
export class EditProductGroupCategoryListComponent  implements OnInit {

  editDMNProductForm!: FormGroup;
  idDMNSanPham: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private ndmproductService: NdmproductService, private snackBar: MatSnackBar, private router: Router) {
    this.idDMNSanPham = null;

  }

  ngOnInit(): void {



    this.idDMNSanPham = this.route.snapshot.paramMap.get('id');
    this.editDMNProductForm = this.fb.group({
      idDMNSanPham: this.idDMNSanPham,
      tenDMNhomSanPham: ['', Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      moTa: ['', Validators.required],


      suDung: ['true', Validators.required],

    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idDMNSanPham !== null) {
      this.ndmproductService.getDMNProductById(this.idDMNSanPham).subscribe({
        next: (productdmnData) => {
          if (productdmnData) {
            this.ngayTaoOriginal = productdmnData.ngayTao;
            this.editDMNProductForm.patchValue({
              tenDMNhomSanPham: productdmnData.tenDMNhomSanPham,
              moTa: productdmnData.moTa,
              suDung: productdmnData.suDung,
            });
          } else {
            console.error('Không tìm thấy id:', this.idDMNSanPham);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu null.');
    }
  }


  onSubmit() {
    if (this.editDMNProductForm.valid && this.idDMNSanPham !== null) {
      const updatedBranch = {
        ...this.editDMNProductForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.ndmproductService.updateDMNProduct(this.idDMNSanPham, updatedBranch).subscribe({
        next: () => {
          console.log('Cập nhật nhóm sản phẩm thành công');
          this.snackBar.open('Sửa nhóm danh mục thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/san-pham/danh-sach-nhom-danh-muc-san-pham']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Không thể cập nhật  null.');
    }
  }
}
