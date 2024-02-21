import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NdmproductService } from '../../../../services/ndmproduct.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product-group-category-list',
  templateUrl: './add-product-group-category-list.component.html',
  styleUrl: './add-product-group-category-list.component.scss'
})
export class AddProductGroupCategoryListComponent {

  addDMNProductForm: FormGroup;

  constructor(private fb: FormBuilder,
    private ndmproductService: NdmproductService,

    private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {

    this.addDMNProductForm = this.fb.group({



      suDung: ['true', Validators.required],
      tenDMNhomSanPham: ['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      moTa: ['', Validators.required],
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
  }

  onSubmit() {

    if (this.addDMNProductForm.valid) {

      const newdmnProduct = this.addDMNProductForm.value;

      this.ndmproductService.addDMNProduct(newdmnProduct).subscribe({
        next: () => {

          console.log('Thêm nhóm danh mục sản phẩm thành công');
          this.snackBar.open('Thêm nhóm danh mục sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/san-pham/danh-sach-nhom-danh-muc-san-pham']);
        },
        error: (error) => {
          console.error('Error adding category group product:', error);
        }
      });
    }
  }
}
