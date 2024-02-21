import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DmkhoService } from '../../../services/dmkho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dm-kho',
  templateUrl: './dm-kho.component.html',
  styleUrl: './dm-kho.component.scss'
})
export class DmKhoComponent {
  displayedColumns: string[] = ['stt', 'tenKho', 'kieuLoai','maKho','isActive','ngayTao', 'ngayCapNhat','actions'];

  dataSource = new MatTableDataSource<DMKhoData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dmkhoService: DmkhoService, private snackBar: MatSnackBar,
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataDMKho();
  }
  getDataDMKho(): void {
    this.dmkhoService.getListDMKho().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element:  DMKhoData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn danh mục kho này không?')) {
      this.dmkhoService.deleteDMKho(String(element.idDMKho)).subscribe({
        next: () => {
          this.snackBar.open('Xóa danh mục kho thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataDMKho();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}
export interface DMKhoData {

  idDMKho: string,
  kieuLoai: string,
  tenKho: string,
  maKho: string,
  isActive: boolean,
  ngayTao: string,
  ngayCapNhat: string
}
