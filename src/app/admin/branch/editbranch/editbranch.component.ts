


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../../services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editbranch',
  templateUrl: './editbranch.component.html',
  styleUrls: ['./editbranch.component.scss']
})
export class EditbranchComponent implements OnInit {

  editBranchForm!: FormGroup;
  idChiNhanh: string | null;
  ngayTaoOriginal: string | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private branchService: BranchService, private snackBar: MatSnackBar, private router: Router) {
    this.idChiNhanh = null;

  }

  ngOnInit(): void {
    this.idChiNhanh = this.route.snapshot.paramMap.get('id');


    this.editBranchForm = this.fb.group({

      tenChiNhanh: ['', Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],

      idChiNhanh: this.idChiNhanh
    });

    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.idChiNhanh !== null) {
      this.branchService.getBranchById(this.idChiNhanh).subscribe({
        next: (branchData) => {
          if (branchData) {
            this.ngayTaoOriginal = branchData.ngayTao; // Lưu trữ giá trị ngayTao
            this.editBranchForm.patchValue({
              tenChiNhanh: branchData.tenChiNhanh,
            });
          } else {
            console.error('Không tìm thấy chi nhánh với id:', this.idChiNhanh);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu chi nhánh với idChiNhanh là null.');
    }
  }


  onSubmit() {
    if (this.editBranchForm.valid && this.idChiNhanh !== null) {
      const updatedBranch = {
        ...this.editBranchForm.value,
        ngayTao: this.ngayTaoOriginal,
      };

      this.branchService.updateBranch(this.idChiNhanh, updatedBranch).subscribe({
        next: () => {
          console.log('Cập nhật chi nhánh thành công');
          this.snackBar.open('Sửa chi nhánh thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/chi-nhanh']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      });
    } else {
      console.error('Không thể cập nhật chi nhánh với idChiNhanh là null.');
    }
  }
}
