import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IdentityModel,
  IdentityResponse,
  LoginModel,
  RegisterModel,
  ResponseMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/identity';
  storageKey = 'identity';
  authenKey = 'isAuthenticated';

  constructor(private http: HttpClient) {}

  IsLogged(): boolean {
    let result = sessionStorage.getItem(this.authenKey);
    return result != null;
  }

  register(data: RegisterModel): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginModel): Observable<IdentityResponse> {
    return this.http.post<IdentityResponse>(`${this.apiUrl}/login`, data);
  }

  saveIdentity(data: IdentityModel): void {
    let json = JSON.stringify(data);
    sessionStorage.setItem(this.authenKey, 'true');
    sessionStorage.setItem(this.storageKey, json);
  }

  getIdentity(): IdentityModel | null {
    let json = sessionStorage.getItem(this.storageKey);
    return json ? (JSON.parse(json) as IdentityModel) : null;
  }

  removeIdentity(): void {
    sessionStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.authenKey);
  }

  refreshToken(): Observable<IdentityResponse> {
    const refreshToken = this.getIdentity()?.refreshToken;
    return this.http.post<IdentityResponse>(`${this.apiUrl}/refresh`, null, {
      headers: {
        RefreshToken: refreshToken!,
      },
    });
  }

  logout(): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/logout`);
  }
}
