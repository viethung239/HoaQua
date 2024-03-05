import { DonhangctService } from './../../../services/donhangct.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonhangService } from '../../../services/donhang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemDonHangComponent } from '../item-don-hang/item-don-hang.component';
import { v4 as uuidv4 } from 'uuid';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-them-don-hang',
  templateUrl: './them-don-hang.component.html',
  styleUrl: './them-don-hang.component.scss'
})
export class ThemDonHangComponent {
  addOrderForm: FormGroup;
  userId: string;
  tenNV: string = '';
  donHangChiTiet: OrdeDetails[] = [];
  idDonHang: string ;
  displayedColumns: string[] = ['idSanPham', 'gia', 'soluong', 'tongtien','actions'];
  dataSource = new MatTableDataSource<OrdeDetails>([]);
  selectedProduct: any;
  SanPham: any[] =[];
  constructor(
    private fb: FormBuilder,
    private donhangctService :DonhangctService,
    private donhangService: DonhangService,
    private router: Router,
    private snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private dialog: MatDialog,
    private productService : ProductService

  ) {
    this.idDonHang = '';
    this.userId = '';
    this.addOrderForm = this.fb.group({
      tenNV: ['', Validators.required],
      tenKhach: ['', Validators.required],
      soDienThoaiKhach: ['', Validators.required],
      diaChi: ['', Validators.required],
      ghiChuDonHang: ['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required]    ,

      maDonHang: [this.generateRandomOrderId(), Validators.required],
      kieuThanhToan: ['', Validators.required],
      thanhTien: ['0', Validators.required],

    });
  }

  ngOnInit(): void {
    this.idDonHang = uuidv4() ?? 'bị null';
    console.log('đơn hàng', this.idDonHang)
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userId = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'];
        console.log('userId', this.userId);
        this.userService.getUserById(this.userId).subscribe({
          next:(userInfo) => {
            this.addOrderForm.patchValue({
              tenNV: userInfo.tenNV,
            });
            this.tenNV = userInfo.tenNV;
            console.log('tenNV', this.tenNV);
          },
          error:(error) => {
            console.error('Lỗi khi lấy tên người dùng:', error);
          }
        });
      }
    }
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.SanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });

  }
  getTenSanPham(idSanPham: string): string {
    const sanPham = this.SanPham.find(c => c.idSanPham === idSanPham);
    return sanPham ? sanPham.tenSanPham : '';
  }
  openDialog(idDonHang: string): void {
    const dialogRef = this.dialog.open(ItemDonHangComponent, {
      width: '800px',
      height: '300px',
      data: { idDonHang: idDonHang }
    });

    dialogRef.componentInstance.selectionConfirmed.subscribe((result) => {
      console.log('Dữ liệu:', result);
      if (result) {
        this.donHangChiTiet.push(result);
        this.dataSource.data = this.donHangChiTiet;
        this.TinhThanhTien();
      }
    });

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  generateRandomOrderId(): string {
    const min = 10000;
    const max = 99999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + randomNum.toString();
  }

  onSubmit() {
    if (this.addOrderForm.valid) {
      const newOrder = {
        ...this.addOrderForm.value,
        userId: this.userId,
        idDonHang: this.idDonHang
      };
      console.log('Dữ liệu trước khi gửi', newOrder);
      this.donhangService.addOrder(newOrder).subscribe({
        next: () => {
          console.log('Lên đơn thành công');
          this.snackBar.open('Lên đơn thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/don-hang/danh-sach-don-hang']);

            this.sendOrderDetails();

        },
        error: (error) => {
          console.error('Error adding order:', error);
        }
      });
    }
  }
  sendOrderDetails(): void {

    this.donHangChiTiet.forEach(orderDetail => {

      this.donhangctService.addOrderDetails(orderDetail).subscribe({
        next: () => {

          console.log('Thêm chi tiết đơn hàng thành công');

        },
        error: (error) => {
          console.error('Error adding order details:', error);

        }
      });
    });
  }
  deleteItem(element: OrdeDetails): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {

      const index = this.donHangChiTiet.findIndex(item => item.idSanPham === element.idSanPham);


      if (index !== -1) {

        this.donHangChiTiet.splice(index, 1);


        this.dataSource.data = [...this.donHangChiTiet];
        this.TinhThanhTien();

        this.snackBar.open('Xóa sản phẩm thành công', 'Đóng', { duration: 3000 });

      }
    }
  }
 TinhThanhTien(): void {
    let total = 0;
    this.donHangChiTiet.forEach(item => {
      total += parseFloat(item.tongTien);
    });
    this.addOrderForm.get('thanhTien')?.setValue(total);
  }
  DonHang(): boolean {
    return this.donHangChiTiet.length > 0;
  }

}
export interface OrdeDetails {

  idDonHangSanPham: string,
  idDonHang: string,
  idSanPham: string,
  soLuong: string,
  gia: string,
  tongTien:string,
  ngayTao: string,
  ngayCapNhat: string
}
