import { Injectable } from '@angular/core';
import { AuthenService } from './authen.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonhangctService {

  constructor(private authenService: AuthenService) {

  }


  getListOrderDetails(): Observable<any> {


      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/DonHangChiTiet');

  }
  deleteDetailsOrder(idDonHangSanPham: string): Observable<any> {
    const url = `https://localhost:7123/api/DonHangChiTiet/${idDonHangSanPham}`;
    return this.authenService.sendProtectedRequestDelete(url);

  }
  updateDetailsOrder(idDonHangSanPham: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/DonHangChiTiet/${idDonHangSanPham}`;
    console.log('Cập nhật với Id đơn hàng chi tiết:', idDonHangSanPham);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addOrderDetails(newOrderData: any): Observable<any> {
    const url = 'https://localhost:7123/api/DonHangChiTiet';
    return this.authenService.sendProtectedRequestPost(url, newOrderData);

  }
  getOrderDetailsById(idDonHangSanPham: string): Observable<any> {
    const url = `https://localhost:7123/api/DonHangChiTiet/${idDonHangSanPham}`;

    return this.authenService.sendProtectedRequestGetById(url);
  }


}
