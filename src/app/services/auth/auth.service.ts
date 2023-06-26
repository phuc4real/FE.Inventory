import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://127.0.0.1:5001/api/auth';
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  register(payload: any): Observable<any> {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:4200'
    });
    debugger;
    return this.http.post(`${this.apiUrl}/register`, payload,{headers});
  }

  login(username: string, password: string): Observable<any> {
    this.http.post(`${this.apiUrl}/login`, { username, password });
    this.isAuthenticated = true;
    return of({ success: true });
  }

  logout(): Observable<any> {
    // Gửi yêu cầu đăng xuất đến API backend
    return this.http.post(`${this.apiUrl}/logout`, {});
  }


  // Các phương thức khác trong AuthService


}
