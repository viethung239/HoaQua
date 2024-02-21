import { AuthenService } from './authen.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DmkhoService {

  constructor(private http: HttpClient, private authenService:AuthenService) {

  }
  getListDMKho(): Observable<any>{

      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/DMKho');
  }
  deleteDMKho(idDMKho: string): Observable<any> {
    const url = `https://localhost:7123/api/DMKho/${idDMKho}`;
    return this.authenService.sendProtectedRequestDelete(url);
  }
  updateDMKho(idDMKho: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/DMKho/`+ idDMKho;
    console.log('Cập nhật với idDMKho:', idDMKho);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addDMKho(newDMKhoData: any): Observable<any> {
    const url = 'https://localhost:7123/api/DMKho';
    return this.authenService.sendProtectedRequestPost(url, newDMKhoData);
  }
  getDMKhoById(idDMKho: string): Observable<any> {
    const url = `https://localhost:7123/api/DMKho/${idDMKho}`;
    return this.authenService.sendProtectedRequestGetById(url);
  }
}
