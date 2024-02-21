import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DmproductService } from '../../../../services/dmproduct.service';
import { NdmproductService } from '../../../../services/ndmproduct.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product-category-list',
  templateUrl: './edit-product-category-list.component.html',
  styleUrl: './edit-product-category-list.component.scss'
})
export class EditProductCategoryListComponent {
  NDMSanPham: any[] =[];
  editDMProductForm!: FormGroup;
  idDMSanPham: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private dmproductService: DmproductService,
    private ndmproductService: NdmproductService, private snackBar: MatSnackBar, private router: Router) {
    this.idDMSanPham = null;

  }

  ngOnInit(): void {

    this.ndmproductService.getListDMNProduct().subscribe({
      next: (data: any) => {
        this.NDMSanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories group:', error);
      }
    });

    this.idDMSanPham = this.route.snapshot.paramMap.get('id');
    this.editDMProductForm= this.fb.group({

      tenDanhMucSanPham: ['', Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      idDMSanPham: this.idDMSanPham,
      idDMNSanPham: ['', Validators.required],

      suDung: ['true', Validators.required],

    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idDMSanPham !== null) {
      this.dmproductService.getDMProductById(this.idDMSanPham).subscribe({
        next: (dmproductData) => {
          if (dmproductData) {
            this.ngayTaoOriginal = dmproductData.ngayTao;
            this.editDMProductForm.patchValue({
              tenDanhMucSanPham: dmproductData.tenDanhMucSanPham,
              idDMNSanPham: dmproductData.idDMNSanPham,
              suDung: dmproductData.suDung,


            });
          } else {
            console.error('Không tìm thấy danh mục sản phẩm  với id:', this.idDMSanPham);
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
    if (!this.idDMSanPham) {
      console.error('Không thể cập nhật sản phẩm với id danh mục sản phẩm là null.');
      return;
    }

    if (this.editDMProductForm.valid) {
      const updatedProduct = {
        ...this.editDMProductForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.dmproductService.updateDMProduct(this.idDMSanPham, updatedProduct).subscribe({
        next: () => {
          console.log('Cập nhật danh mục sản phẩm thành công');
          this.snackBar.open('Sửa danh mục sản phẩm thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/san-pham/danh-sach-danh-muc-san-pham']);
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
