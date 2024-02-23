import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';
@Injectable({
  providedIn: 'root'
})
export class DmproductService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }
  getListDMProduct(): Observable<any>{
    return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/DMSanPham')

}
deleteDMProduct(idDMSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMSanPham/${idDMSanPham}`;
  return this.authenService.sendProtectedRequestDelete(url);
}
updateDMProduct(idDMSanPham: string, updatedData: any): Observable<any> {
  const url = `https://localhost:7123/api/DMSanPham/`+ idDMSanPham;
  console.log('Cập nhật với Id danh mục sản phẩm:', idDMSanPham);
  console.log('Dữ liệu cập nhật:', updatedData);

  return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}
addDMProduct(newDMProductData: any): Observable<any> {
  const url = 'https://localhost:7123/api/DMSanPham';
  return this.authenService.sendProtectedRequestPost(url, newDMProductData);
}
getDMProductById(idDMSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMSanPham/${idDMSanPham}`;
  return this.authenService.sendProtectedRequestGetById(url);
}
}
