import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class NccService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }
  getListNCC(): Observable<any>{
      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/NhaCungCap')

  }
  deleteNCC(idNhaCungCap: string): Observable<any> {
    const url = `https://localhost:7123/api/NhaCungCap/${idNhaCungCap}`;
    return this.authenService.sendProtectedRequestDelete(url);
  }

  updateNCC(idNhaCungCap: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/NhaCungCap/`+ idNhaCungCap;
    console.log('Cập nhật với Id nhà cung cấp:', idNhaCungCap);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addNCC(newNCCData: any): Observable<any> {
    const url = 'https://localhost:7123/api/NhaCungCap';
    return this.authenService.sendProtectedRequestPost(url, newNCCData);
  }
  getNCCById(idNhaCungCap: string): Observable<any> {
    const url = `https://localhost:7123/api/NhaCungCap/${idNhaCungCap}`;
    return this.authenService.sendProtectedRequestGetById(url);
  }
}
