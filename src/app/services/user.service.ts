import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }
  getListUser(): Observable<any>{
      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/User')

  }
  deleteUser(userId: string): Observable<any> {
    const url = `https://localhost:7123/api/User/${userId}`;
    return this.authenService.sendProtectedRequestDelete(url);
  }

  updateUser(userId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/User/`+ userId;
    console.log('Cập nhật với userId:', userId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addUser(newUserData: any): Observable<any> {
    const url = 'https://localhost:7123/api/User';
    return this.authenService.sendProtectedRequestPost(url, newUserData);
  }
  getUserById(userId: string): Observable<any> {
    const url = `https://localhost:7123/api/User/${userId}`;
    return this.authenService.sendProtectedRequestGetById(url);
  }

}
