import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class UseroleService {

  constructor(private http: HttpClient, private authenService: AuthenService) {

  }
  getListRole(): Observable<any>{
      return this.authenService.sendProtectedRequestGet('https://localhost:7123/api/Role')

  }
  deleteRole(roleId: string): Observable<any> {
    const url = `https://localhost:7123/api/Role/${roleId}`;
    return this.authenService.sendProtectedRequestDelete(url);
  }

  updateRole(roleId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/Role/`+ roleId;
    console.log('Cập nhật với Id role:', roleId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.authenService.sendProtectedRequestPut(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addRole(newRoleData: any): Observable<any> {
    const url = 'https://localhost:7123/api/Role';
    return this.authenService.sendProtectedRequestPost(url, newRoleData);
  }
  getRoleById(roleId: string): Observable<any> {
    const url = `https://localhost:7123/api/Role/${roleId}`;
    return this.authenService.sendProtectedRequestGetById(url);
  }
}
