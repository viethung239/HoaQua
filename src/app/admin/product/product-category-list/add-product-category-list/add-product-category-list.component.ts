import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DmproductService } from '../../../../services/dmproduct.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NdmproductService } from '../../../../services/ndmproduct.service';

@Component({
  selector: 'app-add-product-category-list',
  templateUrl: './add-product-category-list.component.html',
  styleUrl: './add-product-category-list.component.scss'
})
export class AddProductCategoryListComponent {
  NDMSanPham: any[] =[];
  addDMProductForm: FormGroup;

  constructor(private fb: FormBuilder, private dmproductService: DmproductService,
    private ndmproductService: NdmproductService,

    private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {

    this.addDMProductForm = this.fb.group({

      idDMNSanPham: ['', Validators.required],


      suDung: ['true', Validators.required],
      tenDanhMucSanPham: ['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],

    });
  }
  ngOnInit(): void {

    this.ndmproductService.getListDMNProduct().subscribe({
      next: (data: any) => {
        this.NDMSanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
  }

  onSubmit() {

    if (this.addDMProductForm.valid) {

      const newdmProduct = this.addDMProductForm.value;

      this.dmproductService.addDMProduct(newdmProduct).subscribe({
        next: () => {

          console.log('Thêm danh mục sản phẩm thành công');
          this.snackBar.open('Thêm danh mục sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/san-pham/danh-sach-danh-muc-san-pham']);
        },
        error: (error) => {
          console.error('Error adding category product:', error);
        }
      });
    }
  }
}
