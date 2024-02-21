import { BranchService } from '../../../../services/branch.service';
import { DmkhoService } from '../../../../services/dmkho.service';
import { NccService } from '../../../../services/ncc.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';

import { KhoService } from '../../../../services/kho.service';
import { KhoctService } from '../../../../services/khoct.service';


@Component({
  selector: 'app-add-kho-details',
  templateUrl: './add-kho-details.component.html',
  styleUrl: './add-kho-details.component.scss'
})
export class AddKhoDetailsComponent {
  SanPham: any[] =[];
  ChiNhanh: any[] =[];
  Kho: any[] = [];
  DMKho: any[] =[];
  NCC: any[] = [];
  addKhoCTForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router, private snackBar: MatSnackBar,
    private khoService: KhoService,
    private khodetailService: KhoctService,
    private nccService:NccService,
    private dmkhoService:DmkhoService,
    private productService: ProductService,
    private branchService:BranchService,

    private http: HttpClient) {

    this.addKhoCTForm = this.fb.group({

      idKho:  ['', Validators.required],
      idDMKho:  ['', Validators.required],
      idChiNhanh: ['', Validators.required],
      idSanPham:  ['', Validators.required],
      idNhaCungCap:  ['', Validators.required],
      soLuong:  ['', Validators.required],
      giaNhapTrungBinh:  ['', Validators.required],

      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],



    });
  }
  /*ngOnInit(): void {
    this.getDataFromAPI(this.khoService.getListKho);
    this.getDataFromAPI(this.nccService.getListNCC);
    this.getDataFromAPI(this.dmkhoService.getListDMKho);
    this.getDataFromAPI(this.productService.getListProduct);
    this.getDataFromAPI(this.branchService.getListBranch);

  }
  getDataFromAPI(apiFunction: () => Observable<any>): void {
    // Gọi API và xử lý kết quả
    apiFunction().subscribe({
      next: (data: any[]) => {

        this.Kho = data[0];
        this.NCC = data[1];
        this.DMKho = data[2];
        this.SanPham = data[3];
        this.ChiNhanh = data[4];
      },
      error: (error: any) => {
        // Xử lý lỗi nếu có
        console.error('Error fetching data:', error);
      }
    });
  }*/
  ngOnInit(): void {
    // Lấy danh sách danh mục sản phẩm từ API
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
  }
  getCurrentDateTime(): string {
    const now = new Date();
    // Chuyển định dạng ngày giờ theo ISO
    return now.toISOString();
  }

  onSubmit() {
    console.log('kho chi tiet trước khi đươc gửi đi',this.addKhoCTForm);
    if (this.addKhoCTForm.valid) {

      const newKhoCT = this.addKhoCTForm.value;

      this.khodetailService.addKhoCT(newKhoCT).subscribe({
        next: () => {

          console.log('Thêm kho chi tiết thành công');
          this.snackBar.open('Thêm kho chi tiết thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/kho/kho-chi-tiet']);
        },
        error: (error) => {
          console.error('Error adding kho chi tiet:', error);
        }
      });
    }
  }
}
