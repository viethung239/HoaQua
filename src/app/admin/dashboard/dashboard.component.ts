import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  TenNV: string | undefined;
  constructor(
    private jwtHelper: JwtHelperService) {

  }
  ngOnInit(): void {
    // Kiểm tra xem có sự tồn tại của localStorage trước khi truy cập
    if (typeof localStorage !== 'undefined') {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.TenNV = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        console.log('Token khi dịch', decodedToken);

      }
    }
  }
}
