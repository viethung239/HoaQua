import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BranchService } from '../../services/branch.service';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss'
})
export class BranchComponent implements AfterViewInit {
  displayedColumns: string[] = ['stt', 'tenChiNhanh', 'ngayTao', 'ngayCapNhat','actions'];
  dataSource = new MatTableDataSource<BranchData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private branchService: BranchService, private snackBar: MatSnackBar,
   ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


    this.getDataBranch();
  }

  getDataBranch(): void {
    this.branchService.getListBranch().subscribe({
      next: (data) => {


        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }





  deleteItem(element: BranchData): void {
    console.log('Xóa mục:', element);

    if (confirm('Bạn có chắc chắn muốn xóa chi nhánh này không?')) {
      this.branchService.deleteBranch(String(element.idChiNhanh)).subscribe({
        next: () => {
          this.snackBar.open('Xóa chi nhánh thành công', 'Đóng', {
            duration: 3000,
          });
          this.getDataBranch();
        },
        error: (error) => {
          console.error(error);

        }
      });
    }
  }

}

export interface BranchData {

  idChiNhanh: string;
  tenChiNhanh: string;
  ngayTao: string;
  ngayCapNhat: string;
}
