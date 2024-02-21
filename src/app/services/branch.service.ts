import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) {

  }

  getListBranch(): Observable<any>{
      return this.http.get<any>('https://localhost:7123/api/ChiNhanh')

  }
  deleteBranch(idChiNhanh: string): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/${idChiNhanh}`;
    return this.http.delete<any>(url);
  }
 /*updateBranch(idChiNhanh: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/${idChiNhanh}`;
    console.log('Cập nhật với Id chi nhánh:', idChiNhanh);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }*/
  updateBranch(idChiNhanh: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/`+ idChiNhanh;
    console.log('Cập nhật với Id chi nhánh:', idChiNhanh);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addBranch(newBranchData: any): Observable<any> {
    const url = 'https://localhost:7123/api/ChiNhanh';
    return this.http.post<any>(url, newBranchData);
  }
  getBranchById(idChiNhanh: string): Observable<any> {
    const url = `https://localhost:7123/api/ChiNhanh/${idChiNhanh}`;
    return this.http.get<any>(url);
  }

}
