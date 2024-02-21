import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getListProduct(): Observable<any>{
    return this.http.get<any>('https://localhost:7123/api/SanPham')

}
deleteProduct(idSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/SanPham/${idSanPham}`;
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
updateProduct(idSanPham: string, updatedData: any): Observable<any> {
  const url = `https://localhost:7123/api/SanPham/`+ idSanPham;
  console.log('Cập nhật với Id sản phẩm:', idSanPham);
  console.log('Dữ liệu cập nhật:', updatedData);

  return this.http.put<any>(url, updatedData).pipe(
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}
addProduct(newProductData: any): Observable<any> {
  const url = 'https://localhost:7123/api/SanPham';
  return this.http.post<any>(url, newProductData);
}
getProductById(idSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/SanPham/${idSanPham}`;
  return this.http.get<any>(url);
}
}
