import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../services/product.service';
import { DonhangctService } from '../../../services/donhangct.service';
@Component({
  selector: 'app-item-don-hang',
  templateUrl: './item-don-hang.component.html',
  styleUrl: './item-don-hang.component.scss',

})
export class ItemDonHangComponent {
  selectedProductId: string ;
  selectedProduct: any;

  addOrderDetailForm: FormGroup;
  SanPham: any[] =[];
  selectedProductPrice: number | undefined;
  @Output() selectionConfirmed = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDonHangComponent>, private productService : ProductService,

    private fb: FormBuilder
    ) {
    this.selectedProductId = '';

    this.addOrderDetailForm = this.fb.group({

      idDonHang:[data.idDonHang, Validators.required],
      idSanPham: ['', Validators.required],
      gia: [ this.selectedProductPrice, Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      tongTien: ['', Validators.required],
      soLuong: ['1', Validators.required],
      });
      this.addOrderDetailForm.get('soLuong')?.valueChanges.subscribe(() => {
        this.tinhTongTien();
      });
   }


  ngOnInit(): void {
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.SanPham = data;
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    });
  }
  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmSelection(): void {
    if (this.addOrderDetailForm.valid) {
      const donHangChiTiet = this.addOrderDetailForm.value;
      console.log('Dữ liệu chuẩn bị gửi:', donHangChiTiet);
      this.selectionConfirmed.emit(donHangChiTiet);
      this.closeDialog();
    } else {
      console.error('Data is null or undefined.');
    }
  }

  onProductSelectionChange(productId: string): void {
    const selectedProduct = this.SanPham.find(product => product.idSanPham === productId);
    this.selectedProductPrice = selectedProduct ? selectedProduct.giaSanPham  : undefined;
    this.addOrderDetailForm.controls['gia'].setValue(this.selectedProductPrice);
    this.tinhTongTien();
  }
  tinhTongTien(): void {
    const soLuongControl = this.addOrderDetailForm.get('soLuong');
    const tongTienControl = this.addOrderDetailForm.get('tongTien');

    const soLuong = soLuongControl?.value ?? 0;
    const tongTien = this.selectedProductPrice ? this.selectedProductPrice * soLuong : 0;

    if (tongTienControl) {
      tongTienControl.setValue(tongTien);
    }
  }
  tangSoLuong(): void {
    let currentValue = this.addOrderDetailForm.get('soLuong')?.value ?? 0;
    currentValue = Number(currentValue);
    this.addOrderDetailForm.get('soLuong')?.setValue(currentValue + 1);
  }

  giamSoLuong(): void {
    let currentValue = this.addOrderDetailForm.get('soLuong')?.value ?? 0;
    currentValue = Number(currentValue);
    if (currentValue > 1) {
      this.addOrderDetailForm.get('soLuong')?.setValue(currentValue - 1);
    }
  }
}
