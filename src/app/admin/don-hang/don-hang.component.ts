import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DonhangService } from '../../services/donhang.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-don-hang',
  templateUrl: './don-hang.component.html',
  styleUrls: ['./don-hang.component.scss']
})
export class DonHangComponent {
  displayedColumns: string[] = ['maDonHang', 'tenKhach','soDienThoaiKhach','diaChi', 'kieuThanhToan', 'ngayTao','actions'];
  dataSource = new MatTableDataSource<Order>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private donhangService: DonhangService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataOrder();
  }
  getDataOrder(): void {
    this.donhangService.getListOrder().subscribe({
      next: (data: Order[]) => {
        data.sort((a: Order, b: Order) => new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime());

        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: Order): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
      this.donhangService.deleteOrder(String(element.idDonHang)).subscribe({
        next: () => {
          this.snackBar.open('Xóa đơn hàng thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataOrder();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}

export interface Order {

  idDonHang: string,
  userId: string,
  thanhTien: string,
  maDonHang: string,
  kieuThanhToan: string,
  tenKhach: string,
  soDienThoaiKhach: string,
  diaChi: string,
  ghiChuDonHang: string,
  ngayTao: string,
  ngayCapNhat: string
}
