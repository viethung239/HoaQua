import { Component } from '@angular/core';
import { KhoService } from '../../../services/kho.service';
import { BranchService } from '../../../services/branch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-kho',
  templateUrl: './add-kho.component.html',
  styleUrl: './add-kho.component.scss'
})
export class AddKhoComponent {
  Branch: any[] =[];
  addKhoForm: FormGroup;

  constructor(private fb: FormBuilder, private khoService: KhoService, private branchService: BranchService,

    private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {

    this.addKhoForm = this.fb.group({

      idChiNhanh: ['', Validators.required],
      tenKho: ['', Validators.required],
      ngayTao: [this.getCurrentDateTime(), Validators.required],
      ngayCapNhat: [this.getCurrentDateTime(), Validators.required],

    });
  }
  ngOnInit(): void {

    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.Branch = data;
      },
      error: (error: any) => {
        console.error('Error fetching branch:', error);
      }
    });
  }
  getCurrentDateTime(): string {
    const now = new Date();

    return now.toISOString();
  }

  onSubmit() {

    if (this.addKhoForm.valid) {

      const newKho = this.addKhoForm.value;

      this.khoService.addKho(newKho).subscribe({
        next: () => {

          console.log('Thêm kho thành công');
          this.snackBar.open('Thêm kho thành công', 'Đóng', {
            duration: 3000,
          });
          this.router.navigate(['admin/kho/danh-sach-kho']);
        },
        error: (error) => {
          console.error('Error adding kho :', error);
        }
      });
    }
  }
}
