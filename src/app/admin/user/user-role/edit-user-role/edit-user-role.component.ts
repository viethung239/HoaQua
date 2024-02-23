import { Component } from '@angular/core';
import { UseroleService } from '../../../../services/userole.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrl: './edit-user-role.component.scss'
})
export class EditUserRoleComponent {
  editRoleForm!: FormGroup;
  roleId: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,  private roleService: UseroleService,
    private snackBar: MatSnackBar, private router: Router) {
    this.roleId = null;
    this.ngayTaoOriginal = null;
  }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id');


    this.editRoleForm = this.fb.group({


      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],

      roleId: this.roleId,


      tenQuyen: ['', Validators.required],
      moTa: ['', Validators.required],



    });

    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.roleId !== null) {
      this.roleService.getRoleById(this.roleId).subscribe({
        next: (roleData) => {
          if (roleData) {
            this.ngayTaoOriginal = roleData.ngayTao; // Lưu trữ giá trị ngayTao
            this.editRoleForm.patchValue({
              tenQuyen: roleData.tenQuyen,
              moTa: roleData.moTa,

            });
          } else {
            console.error('Không tìm thấy quyền với id:', this.roleId);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu  với roleid là null.');
    }
  }


  onSubmit() {
    if (this.editRoleForm.valid && this.roleId !== null) {
      const updatedNCC = {
        ...this.editRoleForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.roleService.updateRole(this.roleId, updatedNCC).subscribe({
        next: () => {
          console.log('Cập nhật quyền thành công');
          this.snackBar.open('Sửa quyền thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nguoi-dung/quyen']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Không thể cập nhật roleid là null.');
    }
  }
}
