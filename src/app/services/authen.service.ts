import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap, throwError } from 'rxjs';
import { navbarData } from '../admin/sidenav/nav-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router) { }

 /* Login(username: string, password: string): Observable<any>{
    return this.http.post<any>('https://localhost:7123/api/Auhen/dang-nhap', { username, password });
  }*/

  Login(username: string, password: string): Observable<any>{
    return this.http.post<any>('https://localhost:7123/api/Auhen/dang-nhap', { username, password })
      .pipe(
        tap(response => {
          if (typeof localStorage !== 'undefined' && response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }
  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return token ? !this.jwtHelper.isTokenExpired(token) : false;
    }
    return false;
  }


   sendProtectedRequestGet(url: string): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(url, { headers });
    }
    else {

      return new Observable();
    }
  }

  sendProtectedRequestDelete(url: string): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete<any>(url, { headers });
    } else {

      return new Observable();
    }
  }
  sendProtectedRequestPut(url: string, updatedData: any): Observable<any> {

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(url, updatedData, { headers });
    } else {

      return new Observable();
    }
  }
  sendProtectedRequestPost(url: string, addData: any): Observable<any> {

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(url, addData, { headers });
    } else {

      return new Observable();
    }
  }
  sendProtectedRequestGetById(url: string): Observable<any> {

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(url, { headers });
    } else {

      return new Observable();
    }
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  Logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }


  getRolesFromToken(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
    }
    return [];
  }


  filterNavigationData(): any[] {
    const userRoles = this.getRolesFromToken();
    console.log('User roles:', userRoles);
    return navbarData.filter(item => {

      return !item.roles || item.roles.some(role => userRoles.includes(role));

    });
  }
}
