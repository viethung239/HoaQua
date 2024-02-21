import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KhoService } from '../../services/kho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from '../../services/branch.service';
import { BranchData } from '../branch/branch.component';

@Component({
  selector: 'app-kho',
  templateUrl: './kho.component.html',
  styleUrl: './kho.component.scss'
})
export class KhoComponent {
  ChiNhanh: BranchData[] = [];
  displayedColumns: string[] = ['stt', 'idChiNhanh','tenKho', 'ngayTao', 'ngayCapNhat','actions'];
  dataSource = new MatTableDataSource<KhoData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private khoService: KhoService, private branchService: BranchService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {

    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.ChiNhanh = data;
        this.getDataKho();
      },
      error: (error: any) => {
        console.error('Error fetching branch:', error);
      }
    });

    this.dataSource.paginator = this.paginator;



  }
  getTenChiNhanh(idChiNhanh: string): string {
    const chiNhanh = this.ChiNhanh.find(c => c.idChiNhanh === idChiNhanh);
    return chiNhanh ? chiNhanh.tenChiNhanh : '';
  }
  getDataKho(): void {
    this.khoService.getListKho().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: KhoData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa kho này không?')) {
      this.khoService.deleteKho(String(element.idKho)).subscribe({
        next: () => {
          this.snackBar.open('Xóa kho thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataKho();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}

export interface KhoData {

  idKho: string,
  idChiNhanh: string,
  tenKho: string,
  ngayTao: string,
  ngayCapNhat: string
}
