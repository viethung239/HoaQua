import { AuthenService } from './authen.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }


  getListBranch(): Observable<any> {


      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/ChiNhanh');

  }
  deleteBranch(idChiNhanh: string): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/${idChiNhanh}`;
    return this.authenService.sendProtectedRequestDelete(url);

  }
  updateBranch(idChiNhanh: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/${idChiNhanh}`;
    console.log('Cập nhật với Id chi nhánh:', idChiNhanh);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addBranch(newBranchData: any): Observable<any> {
    const url = 'https://localhost:7123/api/ChiNhanh';
    return this.authenService.sendProtectedRequestPost(url, newBranchData);

  }
  getBranchById(idChiNhanh: string): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/${idChiNhanh}`;

    return this.authenService.sendProtectedRequestGetById(url);
  }

}
