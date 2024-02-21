import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NccService } from '../../services/ncc.service';

@Component({
  selector: 'app-ncc',
  templateUrl: './ncc.component.html',
  styleUrl: './ncc.component.scss'
})
export class NccComponent {
  displayedColumns: string[] = ['stt', 'tenNhaCung','nguoiLienHe','sdtNguoiLienHe', 'ngayTao', 'ngayCapNhat','actions'];
  dataSource = new MatTableDataSource<NccData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private nccService: NccService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataNCC();
  }

  getDataNCC(): void {
    this.nccService.getListNCC().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: NccData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
      this.nccService.deleteNCC(String(element.idNhaCungCap)).subscribe({
        next: () => {
          this.snackBar.open('Xóa nhà cung cấp thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataNCC();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface NccData {

  idNhaCungCap: string,
  tenNhaCung: string,
  nguoiLienHe: string,
  sdtNguoiLienHe: string,
  diaChi: string,
  email: string,
  suDung: boolean,
  ngayTao: string,
  ngayCapNhat: string
}
