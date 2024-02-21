import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../../services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.scss']
})
export class AddbranchComponent {

  addBranchForm: FormGroup;

  constructor(private fb: FormBuilder, private branchService: BranchService, private router: Router, private snackBar: MatSnackBar) {
    this.addBranchForm = this.fb.group({
      tenChiNhanh: ['', Validators.required],
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
    if (this.addBranchForm.valid) {
      const newBranch = this.addBranchForm.value;
      this.branchService.addBranch(newBranch).subscribe({
        next: () => {

          console.log('Thêm chi nhánh thành công');
          this.snackBar.open('Thêm chi nhánh thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/chi-nhanh']);
        },
        error: (error) => {
          console.error('Error adding branch:', error);
        }
      });
    }
  }
}
