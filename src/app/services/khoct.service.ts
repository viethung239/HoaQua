import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KhoctService {

  constructor(private http: HttpClient) {

  }
  getListKhoCT(): Observable<any>{
      return this.http.get<any>('https://localhost:7123/api/KhoChiTiet')

  }
  deleteKhoCT(idKhoChiTiet: string): Observable<any> {
    const url = `https://localhost:7123/api/KhoChiTiet/${idKhoChiTiet}`;
    return this.http.delete<any>(url);
  }
  updateKhoCT(idKhoChiTiet: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/KhoChiTiet/`+ idKhoChiTiet;
    console.log('Cập nhật với idKhoChiTiet:', idKhoChiTiet);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addKhoCT(newKhoCTData: any): Observable<any> {
    const url = 'https://localhost:7123/api/KhoChiTiet';
    return this.http.post<any>(url, newKhoCTData);
  }
  getKhoCTById(idKhoChiTiet: string): Observable<any> {
    const url = `https://localhost:7123/api/KhoChiTiet/${idKhoChiTiet}`;
    return this.http.get<any>(url);
  }
}
