import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NdmproductService {

  constructor(private http: HttpClient) { }
  getListDMNProduct(): Observable<any>{
    return this.http.get<any>('https://localhost:7123/api/DMNSanPham')

}
deleteDMNProduct(idDMNSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMNSanPham/${idDMNSanPham}`;
  return this.http.delete<any>(url);
}


updateDMNProduct(idDMNSanPham: string, updatedData: any): Observable<any> {
  const url = `https://localhost:7123/api/DMNSanPham/`+ idDMNSanPham;
  console.log('Cập nhật với Id danh mục nhóm sản phẩm:', idDMNSanPham);
  console.log('Dữ liệu cập nhật:', updatedData);

  return this.http.put<any>(url, updatedData).pipe(
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}
addDMNProduct(newDMNProductData: any): Observable<any> {
  const url = 'https://localhost:7123/api/DMNSanPham';
  return this.http.post<any>(url, newDMNProductData);
}
getDMNProductById(idDMNSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMNSanPham/${idDMNSanPham}`;
  return this.http.get<any>(url);
}
}
