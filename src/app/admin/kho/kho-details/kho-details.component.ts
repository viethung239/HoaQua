import { Component, ViewChild } from '@angular/core';
import { ProductData } from '../../product/product.component';
import { KhoData } from '../kho.component';
import { ProductService } from '../../../services/product.service';
import { KhoctService } from '../../../services/khoct.service';
import { KhoService } from '../../../services/kho.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kho-details',
  templateUrl: './kho-details.component.html',
  styleUrl: './kho-details.component.scss'
})
export class KhoDetailsComponent {
  SanPham: ProductData[] = [];
  Kho: KhoData[] = [];
  displayedColumns: string[] = ['stt', 'idKho','idSanPham','soLuong', 'ngayTao', 'ngayCapNhat','actions'];
  dataSource = new MatTableDataSource<KhoDetailsData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private khoService: KhoService, private productService: ProductService,
    private khodetailService: KhoctService
    , private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {

    this.khoService.getListKho().subscribe({
      next: (data: any) => {
        this.Kho = data;

      },
      error: (error: any) => {
        console.error('Error fetching kho:', error);
      }
    });
    this.productService.getListProduct().subscribe({
      next: (data: any) => {
        this.SanPham = data;

      },
      error: (error: any) => {
        console.error('Error fetching product:', error);
      }
    });

    this.dataSource.paginator = this.paginator;

    this.getDataKhoDetails();

  }
  getTenKho(idKho: string): string {
    const kho = this.Kho.find(c => c.idKho === idKho);
    return kho ? kho.tenKho : '';
  }
  getTenSanPham(idSanPham: string): string {
    const sanPham = this.SanPham.find(c => c.idSanPham === idSanPham);
    return sanPham ? sanPham.tenSanPham : '';
  }
  getDataKhoDetails(): void {
    this.khodetailService.getListKhoCT().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: KhoDetailsData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa kho chi tiết này không?')) {
      this.khodetailService.deleteKhoCT(String(element.idKhoChiTiet)).subscribe({
        next: () => {
          this.snackBar.open('Xóa kho chi tiết thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataKhoDetails();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}

export interface KhoDetailsData {

  idKhoChiTiet: string,
  idKho: string,
  idDMKho: string,
  idChiNhanh: string,
  idSanPham: string,
  idNhaCungCap: string,
  soLuong: string,
  giaNhapTrungBinh: string,
  ngayTao: string,
  ngayCapNhat: string
}
