import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UseroleService } from '../../../services/userole.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent {
  displayedColumns: string[] = ['stt', 'tenQuyen','moTa', 'ngayTao', 'ngayCapNhat','actions'];
  dataSource = new MatTableDataSource<RoleData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roleService: UseroleService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataRole();
  }

  getDataRole(): void {
    this.roleService.getListRole().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: RoleData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa quyền này không?')) {
      this.roleService.deleteRole(String(element.roleId)).subscribe({
        next: () => {
          this.snackBar.open('Xóa quyền thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataRole();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }
}
export interface RoleData {

  roleId: string,
  tenQuyen: string,
  moTa: string,
  ngayTao: string,
  ngayCapNhat: string
}
