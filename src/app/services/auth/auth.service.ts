import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  isAuthenticated: boolean = false;
  authTokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, payload);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isAuthenticated = true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  logout(): Observable<any> {
    localStorage.removeItem(this.authTokenKey);
    this.isAuthenticated = false;
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }
}
