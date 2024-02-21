import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  displayedColumns: string[] = ['stt', 'userName', 'email','soDienThoai','ngayTao', 'ngayCapNhat','actions'];

  dataSource = new MatTableDataSource<UserData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService, private snackBar: MatSnackBar,
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataUser();
  }
  getDataUser(): void {
    this.userService.getListUser().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  deleteItem(element: UserData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      this.userService.deleteUser(String(element.userId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa người dùng thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataUser();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface UserData {

  userId: string,
  idChiNhanh: string,
  roleId: string,
  userName: string,
  password: string,
  email: string,
  avartarUrl: string,
  maNV: string,
  tenNV: string,
  soDienThoai: string,
  diaChi: string,
  ngaySinh: string,
  gioiTinh: string,
  ngayTao: string,
  ngayCapNhat: string,
  isActive: boolean
}
