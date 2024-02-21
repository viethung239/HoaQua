import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DmproductService } from '../../../services/dmproduct.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.scss'
})
export class ProductCategoryListComponent {
  displayedColumns: string[] = ['stt', 'tenDanhMucSanPham', 'ngayTao', 'ngayCapNhat','actions'];
  dataSource = new MatTableDataSource<ProductCategoryData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dmproductService: DmproductService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataDMProduct();
  }

  getDataDMProduct(): void {
    this.dmproductService.getListDMProduct().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: ProductCategoryData ): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa danh mục sản phẩm  này không?')) {
      this.dmproductService.deleteDMProduct(String(element.idDMSanPham)).subscribe({
        next: () => {
          this.snackBar.open('Xóa chi nhánh thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataDMProduct();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface ProductCategoryData {

  idDMSanPham: string;
  idDMNSanPham:string;
  tenDanhMucSanPham: string;
  suDung: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}
