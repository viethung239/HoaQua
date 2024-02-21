import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UseroleService {

  constructor(private http: HttpClient) {

  }
  getListRole(): Observable<any>{
      return this.http.get<any>('https://localhost:7123/api/Role')

  }
  deleteRole(roleId: string): Observable<any> {
    const url = `https://localhost:7123/api/Role/${roleId}`;
    return this.http.delete<any>(url);
  }

  updateRole(roleId: string, updatedData: any): Observable<any> {
    const url = `https://localhost:7123/api/Role/`+ roleId;
    console.log('Cập nhật với Id role:', roleId);
    console.log('Dữ liệu cập nhật:', updatedData);

    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
  addRole(newRoleData: any): Observable<any> {
    const url = 'https://localhost:7123/api/Role';
    return this.http.post<any>(url, newRoleData);
  }
  getRoleById(roleId: string): Observable<any> {
    const url = `https://localhost:7123/api/Role/${roleId}`;
    return this.http.get<any>(url);
  }
}
