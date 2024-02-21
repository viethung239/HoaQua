import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DmproductService } from '../../../services/dmproduct.service';



@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {
  DMSanPham: any[] =[];
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService,
    private dmproductService : DmproductService,
    private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {

    this.addProductForm = this.fb.group({

      idDMSanPham: ['', Validators.required],
      giaSanPham: ['', Validators.required],
      giaNhapVao: ['', Validators.required],
      mota: ['', Validators.required],
      suDung: ['true', Validators.required],
      tenSanPham: ['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      idImage: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Lấy danh sách danh mục sản phẩm từ API
    this.dmproductService.getListDMProduct().subscribe({
      next: (data: any) => {
        this.DMSanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  getCurrentDateTime(): string {
    const now = new Date();
    // Chuyển định dạng ngày giờ theo ISO
    return now.toISOString();
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    // Lưu tên tệp vào biến trong component
    this.addProductForm.patchValue({
      idImage: fileName
    });
  }
  onSubmit() {
    console.log('sản phẩm trước khi đươc gửi đi',this.addProductForm);
    if (this.addProductForm.valid) {

      const newProduct = this.addProductForm.value;

      this.productService.addProduct(newProduct).subscribe({
        next: () => {

          console.log('Thêm sản phẩm thành công');
          this.snackBar.open('Thêm sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/san-pham/danh-sach-san-pham']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

}
