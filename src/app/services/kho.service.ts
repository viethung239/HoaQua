import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class KhoService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }
  getListKho(): Observable<any>{
      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/Kho')

  }
  deleteKho(idKho: string): Observable<any> {
    const url = `https://localhost:7123/api/Kho/${idKho}`;
    return this.authenService.sendProtectedRequestDelete(url);
  }
  updateKho(idKho: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/Kho/`+ idKho;
    console.log('Cập nhật với Id kho:', idKho);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addKho(newKhoData: any): Observable<any> {
    const url = 'https://localhost:7123/api/Kho';
    return this.authenService.sendProtectedRequestPost(url, newKhoData);
  }
  getKhoById(idKho: string): Observable<any> {
    const url = `https://localhost:7123/api/Kho/${idKho}`;
    return this.authenService.sendProtectedRequestGetById(url);
  }
}
