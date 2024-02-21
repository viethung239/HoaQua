import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  getListUser(): Observable<any>{
      return this.http.get<any>('https://localhost:7123/api/User')

  }
  deleteUser(userId: string): Observable<any> {
    const url = `https://localhost:7123/api/User/${userId}`;
    return this.http.delete<any>(url);
  }

  updateUser(userId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/User/`+ userId;
    console.log('Cập nhật với userId:', userId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addUser(newUserData: any): Observable<any> {
    const url = 'https://localhost:7123/api/User';
    return this.http.post<any>(url, newUserData);
  }
  getUserById(userId: string): Observable<any> {
    const url = `https://localhost:7123/api/User/${userId}`;
    return this.http.get<any>(url);
  }
}
