import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }

getListProduct(): Observable<any>{
    return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/SanPham')

}
deleteProduct(idSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/SanPham/${idSanPham}`;
  return this.authenService.sendProtectedRequestDelete(url);
}

updateProduct(idSanPham: string, updatedData: any): Observable<any> {
  const url = `https://localhost:7123/api/SanPham/`+ idSanPham;
  console.log('Cập nhật với Id sản phẩm:', idSanPham);
  console.log('Dữ liệu cập nhật:', updatedData);

  return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}
addProduct(newProductData: any): Observable<any> {
  const url = 'https://localhost:7123/api/SanPham';
  return this.authenService.sendProtectedRequestPost(url, newProductData);
}
getProductById(idSanPham: string): Observable<any> {
  const url = `https://localhost:7123/api/SanPham/${idSanPham}`;
  return this.authenService.sendProtectedRequestGetById(url);
}
}
