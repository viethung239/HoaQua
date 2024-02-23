import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UseroleService } from '../../../services/userole.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent  {
  ChiNhanh: any[] =[];
  Role: any[] = [];
  hide = true;
  editUserForm!: FormGroup;
  userId: string | null;
  ngayTaoOriginal: string | null = null;
  userNameG: string | null = null;
  passwordG: string | null = null;
  maNVG: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private userService: UserService,
    private userRoleService : UseroleService, private branchService: BranchService, private snackBar: MatSnackBar, private router: Router) {
    this.userId = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {

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

    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.editUserForm = this.fb.group({

      userId:this.userId,

      idChiNhanh: ['', Validators.required],
      roleId: ['', Validators.required],

      email: ['', Validators.required],
      avartarUrl: ['', Validators.required],

      tenNV: ['', Validators.required],
      soDienThoai: ['', Validators.required],
      diaChi: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      gioiTinh: ['', Validators.required],

      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],
      isActive: ['true', Validators.required],



    });

    this.loadDataForEdit();

  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe({
        next: (userData) => {
          if (userData) {
            this.ngayTaoOriginal = userData.ngayTao;
            this.userNameG = userData.userName;
            this.passwordG = userData.password;
            this.maNVG = userData.maNV;
            this.editUserForm.patchValue({
              tenNV: userData.tenNV,
              idChiNhanh: userData.idChiNhanh,
              roleId: userData.roleId,
              email: userData.email,
              soDienThoai: userData.soDienThoai,
              diaChi: userData.diaChi,
              avartarUrl: userData.avartarUrl,
              ngaySinh: userData.ngaySinh,
              gioiTinh: userData.gioiTinh,
              isActive: userData.isActive
            });
          } else {
            console.error('Không tìm thấy người dùng  với id:', this.userId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu với userId là null.');
    }
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log('Tên tệp đã chọn:', fileName);

    // Lưu tên tệp vào biến trong component
    this.editUserForm.patchValue({
      avartarUrl: fileName
    });
  }

  onSubmit() {
    if (!this.userId) {
      console.error('Không thể cập nhật sản phẩm với userId là null.');
      return;
    }

    if (this.editUserForm.valid) {
      const updateUser = {
        ...this.editUserForm.value,
        ngayTao: this.ngayTaoOriginal,
        userName: this.userNameG,
        passWord: this.passwordG,
        maNV: this.maNVG
      };

      this.userService.updateUser(this.userId, updateUser).subscribe({
        next: () => {
          console.log('Cập nhật thông tin thành công');
          this.snackBar.open('Sửa thông tin thành công', 'Đóng', { duration: 3000 });
          this.router.navigate(['admin/nguoi-dung/danh-sach-nguoi-dung']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Biểu mẫu không hợp lệ.');
      // Hiển thị thông báo lỗi cho người dùng nếu cần
    }
  }
}
