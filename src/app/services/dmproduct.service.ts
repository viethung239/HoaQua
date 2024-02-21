import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DmproductService {

  constructor(private http: HttpClient) { }
  getListDMProduct(): Observable<any>{
    return this.http.get<any>('https://localhost:7123/api/DMSanPham')

}
deleteDMProduct(idDMSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMSanPham/${idDMSanPham}`;
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
updateDMProduct(idDMSanPham: string, updatedData: any): Observable<any> {
  const url = `https://localhost:7123/api/DMSanPham/`+ idDMSanPham;
  console.log('Cập nhật với Id danh mục sản phẩm:', idDMSanPham);
  console.log('Dữ liệu cập nhật:', updatedData);

  return this.http.put<any>(url, updatedData).pipe(
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}
addDMProduct(newDMProductData: any): Observable<any> {
  const url = 'https://localhost:7123/api/DMSanPham';
  return this.http.post<any>(url, newDMProductData);
}
getDMProductById(idDMSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMSanPham/${idDMSanPham}`;
  return this.http.get<any>(url);
}
}
