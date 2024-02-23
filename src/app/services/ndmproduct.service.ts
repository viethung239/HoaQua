import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class NdmproductService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }

getListDMNProduct(): Observable<any>{
    return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/DMNSanPham')

}
deleteDMNProduct(idDMNSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMNSanPham/${idDMNSanPham}`;
  return this.authenService.sendProtectedRequestDelete(url);
}


updateDMNProduct(idDMNSanPham: string, updatedData: any): Observable<any> {
  const url = `https://localhost:7123/api/DMNSanPham/`+ idDMNSanPham;
  console.log('Cập nhật với Id danh mục nhóm sản phẩm:', idDMNSanPham);
  console.log('Dữ liệu cập nhật:', updatedData);

  return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}
addDMNProduct(newDMNProductData: any): Observable<any> {
  const url = 'https://localhost:7123/api/DMNSanPham';
  return this.authenService.sendProtectedRequestPost(url, newDMNProductData);
}
getDMNProductById(idDMNSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/DMNSanPham/${idDMNSanPham}`;
  return this.authenService.sendProtectedRequestGetById(url);
}
}
