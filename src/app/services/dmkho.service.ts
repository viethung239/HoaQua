import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DmkhoService {

  constructor(private http: HttpClient) {

  }
  getListDMKho(): Observable<any>{
      return this.http.get<any>('https://localhost:7123/api/DMKho')

  }
  deleteDMKho(idDMKho: string): Observable<any> {
    const url = `https://localhost:7123/api/DMKho/${idDMKho}`;
    return this.http.delete<any>(url);
  }
  updateDMKho(idDMKho: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/DMKho/`+ idDMKho;
    console.log('Cập nhật với idDMKho:', idDMKho);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addDMKho(newDMKhoData: any): Observable<any> {
    const url = 'https://localhost:7123/api/DMKho';
    return this.http.post<any>(url, newDMKhoData);
  }
  getDMKhoById(idDMKho: string): Observable<any> {
    const url = `https://localhost:7123/api/DMKho/${idDMKho}`;
    return this.http.get<any>(url);
  }
}
