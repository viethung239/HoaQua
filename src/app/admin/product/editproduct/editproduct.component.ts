import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DmproductService } from '../../../services/dmproduct.service';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent implements OnInit {
  DMSanPham: any[] =[];
  editProductForm!: FormGroup;
  idSanPham: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private productService: ProductService,
    private dmproductService : DmproductService, private snackBar: MatSnackBar, private router: Router) {
    this.idSanPham = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {

    this.dmproductService.getListDMProduct().subscribe({
      next: (data: any) => {
        this.DMSanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });

    this.idSanPham = this.route.snapshot.paramMap.get('id');
    this.editProductForm = this.fb.group({

      tenSanPham: ['', Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      idSanPham: this.idSanPham,
      idDMSanPham: ['', Validators.required],
      giaSanPham: ['', Validators.required],
      giaNhapVao: ['', Validators.required],
      mota: ['', Validators.required],
      suDung: ['true', Validators.required],
      idImage: ['', Validators.required]
    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idSanPham !== null) {
      this.productService.getProductById(this.idSanPham).subscribe({
        next: (productData) => {
          if (productData) {
            this.ngayTaoOriginal = productData.ngayTao;
            this.editProductForm.patchValue({
              tenSanPham: productData.tenSanPham,
              giaSanPham: productData.giaSanPham,
              giaNhapVao: productData.giaNhapVao,
              mota: productData.mota,
              idDMSanPham: productData.idDMSanPham,
              suDung: productData.suDung,
              idImage: productData.idImage

            });
          } else {
            console.error('Không tìm thấy sản phẩm  với id:', this.idSanPham);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu sản phẩm  với idSanPham là null.');
    }
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileSize = selectedFile.size;
      const fileType = selectedFile.type;


      if (!fileType.startsWith('image/')) {
        console.error('Chỉ chấp nhận các loại file ảnh.');
        return;
      }


      const maxSizeBytes = 5 * 1024 * 1024;
      if (fileSize > maxSizeBytes) {
        console.error('Kích thước file vượt quá giới hạn cho phép.');
        return;
      }

      console.log('Tên tệp đã chọn:', fileName);


      this.editProductForm.patchValue({
        idImage: fileName
      });
    } else {
      console.error('Không tìm thấy tệp đã chọn');
    }
  }

  onSubmit() {
    if (!this.idSanPham) {
      console.error('Không thể cập nhật sản phẩm với id sản phẩm là null.');
      return;
    }

    if (this.editProductForm.valid) {
      const updatedProduct = {
        ...this.editProductForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.productService.updateProduct(this.idSanPham, updatedProduct).subscribe({
        next: () => {
          console.log('Cập nhật sản phẩm thành công');
          this.snackBar.open('Sửa sản phẩm thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/san-pham/danh-sach-san-pham']);
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
