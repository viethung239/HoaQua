import { BranchService } from '../../../services/branch.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UseroleService } from '../../../services/userole.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  ChiNhanh: any[] =[];
  Role: any[] = [];
  addUserForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private userService: UserService,
    private userRoleService : UseroleService, private branchService: BranchService,
    private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {

    this.addUserForm = this.fb.group({

      idChiNhanh: ['', Validators.required],
      roleId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      avartarUrl: ['', Validators.required],
      maNV: ['', Validators.required],
      tenNV: ['', Validators.required],
      soDienThoai: ['', Validators.required],
      diaChi: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      isActive: ['true', Validators.required],

    });
  }

  ngOnInit(): void {
    // Lấy danh sách danh mục sản phẩm từ API
    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.ChiNhanh = data;
      },
      error: (error: any) => {
        console.error('Error fetching chinhnhanhdata:', error);
      }
    });
     this.userRoleService.getListRole().subscribe({
      next: (data: any) => {
        this.Role = data;
      },
      error: (error: any) => {
        console.error('Error fetching role:', error);
      }
    });
  }
  getCurrentDateTime(): string {
    const now = new Date();
    // Chuyển định dạng ngày giờ theo ISO
    return now.toISOString();
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    // Lưu tên tệp vào biến trong component
    this.addUserForm.patchValue({
      avartarUrl: fileName
    });
  }
  onSubmit() {
    console.log('người dùng trước khi đươc gửi đi',this.addUserForm);
    if (this.addUserForm.valid) {

      const newUser = this.addUserForm.value;

      this.userService.addUser(newUser).subscribe({
        next: () => {

          console.log('Thêm người dùng thành công');
          this.snackBar.open('Thêm người dùng thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nguoi-dung/danh-sach-nguoi-dung']);
        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      });
    }
  }
}
