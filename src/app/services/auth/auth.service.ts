import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenModel } from 'src/app/models/token-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  authTokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  async getIsAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    if (token) {
      let expireTime = Date.parse(token!.expireTime.toString());
      let curDate = Date.parse(new Date().toString());
      if (expireTime > curDate) {
        return true;
      } else {
        let isSuccess = await this.tryRefreshToken();
        return isSuccess;
      }
    } else {
      return false;
    }
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, payload);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }

  saveToken(tokenModel: TokenModel): void {
    let json = JSON.stringify(tokenModel);
    localStorage.setItem(this.authTokenKey, json);
  }

  getToken(): TokenModel | null {
    let json = localStorage.getItem(this.authTokenKey);
    return json ? (JSON.parse(json) as TokenModel) : null;
  }

  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getToken()?.refreshToken;
    return this.http.post(`${this.apiUrl}/auth/refresh`, null, {
      headers: {
        RefreshToken: refreshToken!,
      },
    });
  }

  async tryRefreshToken(): Promise<boolean> {
    // console.log('Trying to refresh token');
    try {
      const response = await this.refreshToken().toPromise();
      this.saveToken(response);
      // console.log('Token refreshed successfully');
      return true;
    } catch (error: any) {
      if (
        error.status === 400 &&
        Array.isArray(error.error) &&
        error.error.length > 0
      ) {
        const errorMessage = error.error[0].value;
        console.log(errorMessage);
      } else {
        console.log('Something went wrong. Please try again.');
      }

      return false;
    }
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/logout`, {});
  }
}
