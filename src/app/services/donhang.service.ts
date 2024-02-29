import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenService } from './authen.service';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonhangService {



  constructor(private http: HttpClient, private authenService: AuthenService) {

  }


  getListOrder(): Observable<any> {


      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/DonHang');

  }
  deleteOrder(idDonHang: string): Observable<any> {
    const url = `https://localhost:7123/api/DonHang/${idDonHang}`;
    return this.authenService.sendProtectedRequestDelete(url);

  }
  updateOrder(idDonHang: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/DonHang/${idDonHang}`;
    console.log('Cập nhật với Id đơn hàng:', idDonHang);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addOrder(newOrderData: any): Observable<any> {
    const url = 'https://localhost:7123/api/DonHang';
    return this.authenService.sendProtectedRequestPost(url, newOrderData);

  }
  getOrderById(idDonHang: string): Observable<any> {
    const url = `https://localhost:7123/api/DonHang/${idDonHang}`;

    return this.authenService.sendProtectedRequestGetById(url);
  }
}
