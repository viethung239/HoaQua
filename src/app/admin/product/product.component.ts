
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit{

  displayedColumns: string[] = ['stt', 'tenSanPham', 'giaSanPham','ngayTao', 'ngayCapNhat','actions'];

  dataSource = new MatTableDataSource<ProductData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private productService: ProductService, private snackBar: MatSnackBar,
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataProduct();
  }
  getDataProduct(): void {
    this.productService.getListProduct().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: ProductData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(String(element.idSanPham)).subscribe({
        next: () => {
          this.snackBar.open('Xóa sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataProduct();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}
export interface ProductData {

  idSanPham: string,
  idDMSanPham: string,
  tenSanPham: string,
  giaSanPham: string,
  giaNhapVao: string,
  mota: string,
  idImage: string,
  suDung: boolean,
  ngayTao: string,
  ngayCapNhat: string
}


