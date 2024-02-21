import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NdmproductService } from '../../../services/ndmproduct.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-category-group-list',
  templateUrl: './product-category-group-list.component.html',
  styleUrl: './product-category-group-list.component.scss'
})
export class ProductCategoryGroupListComponent {
  displayedColumns: string[] = ['stt', 'tenDMNhomSanPham', 'ngayTao', 'ngayCapNhat', 'suDung','moTa','actions'];
  dataSource = new MatTableDataSource<ProductCategoryGroupData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ndmproductService: NdmproductService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataDMNProduct();
  }

  getDataDMNProduct(): void {
    this.ndmproductService.getListDMNProduct().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: ProductCategoryGroupData ): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa nhóm danh mục sản phẩm  này không?')) {
      this.ndmproductService.deleteDMNProduct(String(element.idDMNSanPham)).subscribe({
        next: () => {
          this.snackBar.open('Xóa nhóm danh mục sản phẩm thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataDMNProduct();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface ProductCategoryGroupData {


  idDMNSanPham:string;
  tenDMNhomSanPham: string;
  moTa: string;
  suDung: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}
