import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { greaterThan } from '../share/helpers/utilities-helper';
import { ResponseMessage, IdentityModel, IdentityResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/identity';
  storageKey = 'token';
  authenKey = 'isAuthenticated';

  constructor(private http: HttpClient) {}

  // async IsAuthenticated(): Promise<boolean> {
  //   const token = this.getIdentity();
  //   if (token) {
  //     if (greaterThan(token.expireTime, new Date())) {
  //       return true;
  //     } else {
  //       let isSuccess = await this.tryRefreshToken();
  //       return isSuccess;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  IsLogged(): boolean {
    let result = sessionStorage.getItem(this.authenKey);
    return result != null;
  }

  register(payload: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/register`, payload);
  }

  login(username: string, password: string): Observable<IdentityResponse> {
    return this.http.post<IdentityResponse>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }

  saveIdentity(tokenModel: IdentityModel): void {
    let json = JSON.stringify(tokenModel);
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

  // async tryRefreshToken(): Promise<boolean> {
  //   console.log('Trying to refresh token');
  //   try {
  //     const response = await this.refreshToken().toPromise();
  //     this.saveIdentity(response!.data);
  //     console.log('Token refreshed successfully');
  //     return true;
  //   } catch (error: any) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  logout(): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/logout`);
  }
}
