import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonhangService } from '../../../services/donhang.service';
import { DonhangctService } from '../../../services/donhangct.service';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-chi-tiet-don-hang',
  templateUrl: './chi-tiet-don-hang.component.html',
  styleUrl: './chi-tiet-don-hang.component.scss'
})
export class ChiTietDonHangComponent {
  User: any[] =[];
  idDonHang: string | null;

  order: any;
  orderdetails: any[] = [];
  SanPham: any[] =[];
  orderUserName: string | undefined;
  constructor(private route: ActivatedRoute,  private donhangService: DonhangService,
     private donhangctService : DonhangctService , private userService:UserService,
     private productService : ProductService) {
    this.idDonHang = null;


  }
  displayedColumns: string[] = ['idSanPham', 'gia', 'soluong', 'tongtien'];

  ngOnInit(): void {
    this.userService.getListUser().subscribe({
      next: (data: any) => {
        this.User = data;
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.SanPham = data;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
    this.idDonHang = this.route.snapshot.paramMap.get('id')!;

    this.getOrderData(this.idDonHang);
    this.getOrderDetailbyId(this.idDonHang);
  }
  getTenSanPham(idSanPham: string): string {
    const sanPham = this.SanPham.find(c => c.idSanPham === idSanPham);
    return sanPham ? sanPham.tenSanPham : '';
  }
  getTenNguoiDung(userId: string): string {
    const user = this.User.find(c => c.userId === userId);
    return user ? user.tenNV : '';
  }
  getOrderData(id: string): void {
    this.donhangService.getOrderById(id).subscribe((data: any) => {
      this.order = data;
      this.orderUserName = this.getTenNguoiDung(this.order.userId);
    });
  }
  getOrderDetailbyId(id: string): void {
    this.donhangctService.getListOrderDetails().subscribe((data: any[]) => {
        this.orderdetails = data.filter(detail => detail.idDonHang === id);

    });
}
}
