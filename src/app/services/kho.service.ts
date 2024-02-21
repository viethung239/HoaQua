import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KhoService {

  constructor(private http: HttpClient) {

  }
  getListKho(): Observable<any>{
      return this.http.get<any>('https://localhost:7123/api/Kho')

  }
  deleteKho(idKho: string): Observable<any> {
    const url = `https://localhost:7123/api/Kho/${idKho}`;
    return this.http.delete<any>(url);
  }
  updateKho(idKho: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/Kho/`+ idKho;
    console.log('Cập nhật với Id kho:', idKho);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addKho(newKhoData: any): Observable<any> {
    const url = 'https://localhost:7123/api/Kho';
    return this.http.post<any>(url, newKhoData);
  }
  getKhoById(idKho: string): Observable<any> {
    const url = `https://localhost:7123/api/Kho/${idKho}`;
    return this.http.get<any>(url);
  }
}
