import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UseroleService } from '../../../../services/userole.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrl: './add-user-role.component.scss'
})
export class AddUserRoleComponent {
  addRoleForm: FormGroup;

  constructor(private fb: FormBuilder,private roleService: UseroleService, private router: Router, private snackBar: MatSnackBar) {
    this.addRoleForm = this.fb.group({
      tenQuyen: ['', Validators.required],
      moTa:['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required]
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    // Chuyển định dạng ngày giờ theo ISO
    return now.toISOString();
  }

  onSubmit() {
    if (this.addRoleForm.valid) {
      const newNCC = this.addRoleForm.value;
      this.roleService.addRole(newNCC).subscribe({
        next: () => {

          console.log('Thêm quyền thành công');
          this.snackBar.open('Thêm quyền thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/nguoi-dung/quyen']);
        },
        error: (error) => {
          console.error('Error adding role:', error);
        }
      });
    }
  }
}
