import { AuthenService } from './../../services/authen.service';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  jwtHelper = new JwtHelperService();
  username!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router, private authenService:AuthenService
    , private snackBar: MatSnackBar) {

  }

  Login(): void {
    this.authenService.Login(this.username, this.password)
      .pipe(
        catchError(error => {
          console.error('Đăng nhập không thành công', error, { username: this.username, password: this.password });
          this.snackBar.open('Tên tài khoản hoặc mật khẩu không chính xác', 'Đóng', {
            duration: 3000,
          });

          return new Observable<never>();
        })
      )
      .subscribe(response => {
        const token = response.token;
        // Chỉ sử dụng dịch vụ AuthenService để lưu token
        this.authenService.saveToken(token);
        console.log('Đăng nhập thành công', token);

        this.snackBar.open('Đăng nhập thành công', 'Đóng', {
          duration: 3000,
        });
        this.router.navigate(['admin/trang-chu']);
      });
  }




}
