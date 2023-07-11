import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenModel } from 'src/app/models/token-model';
import { greaterThan } from '../share/helpers/utilities-hepler';

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
      // let expireTime = Date.parse(token!.expireTime.toString());
      // let curDate = Date.parse(new Date().toString());
      // if (expireTime > curDate) {
      if (greaterThan(token.expireTime, new Date())) {
        return true;
      } else {
        let isSuccess = await this.tryRefreshToken();
        return isSuccess;
      }
    } else {
      return false;
    }
  }

  getIsLogged(): boolean {
    return this.getToken() != null;
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

  refreshToken(): Observable<TokenModel> {
    const refreshToken = this.getToken()?.refreshToken;
    return this.http.post<TokenModel>(`${this.apiUrl}/auth/refresh`, null, {
      headers: {
        RefreshToken: refreshToken!,
      },
    });
  }
  async tryRefreshToken(): Promise<boolean> {
    console.log('Trying to refresh token');
    try {
      const response = await this.refreshToken().toPromise();
      this.saveToken(response!);
      console.log('Token refreshed successfully');
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

  // tryRefreshToken(): boolean {
  //   var isSuccess: boolean = false;
  //   this.refreshToken().subscribe(
  //     (response) => {
  //       this.saveToken(response);
  //       isSuccess = true;
  //       console.log('Refresh token successfully!');
  //     },
  //     (error: any) => {
  //       if (
  //         error.status === 400 &&
  //         Array.isArray(error.error) &&
  //         error.error.length > 0
  //       ) {
  //         const errorMessage = error.error[0].value;
  //         console.log(errorMessage);
  //       } else {
  //         console.log('Something went wrong. Please try again.');
  //       }
  //     }
  //   );
  //   return isSuccess;
  // }

  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/logout`, {});
  }
}
