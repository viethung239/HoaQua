
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  jwtHelper = new JwtHelperService();
  username!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router) {

  }

  login() {

    this.http.post<any>('https://localhost:7123/api/Auhen/dang-nhap', { username: this.username, password: this.password })
      .pipe(
        catchError(error => {
          console.error('Đăng nhập không thành công', error,{ username: this.username, password: this.password });
          return new Observable<never>(); // Throw error để tiếp tục xử lý ở subscribe

        })
      )
      .subscribe(response => {


        const token = response.token;
        localStorage.setItem('token', token);
        console.log('Đăng nhập thành công', token);
        this.router.navigate(['admin/trang-chu']);
      });
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    // Kiểm tra xem token có hợp lệ không
    return !this.jwtHelper.isTokenExpired(token);
  }
}
