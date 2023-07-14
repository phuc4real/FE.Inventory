import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { greaterThan } from '../share/helpers/utilities-helper';
import { ResponseMessage, TokenModel } from '../models';

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

  register(payload: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.apiUrl}/auth/register`,
      payload
    );
  }

  login(username: string, password: string): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    });
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
    // var bool = false;
    // this.refreshToken().subscribe(
    //   (token) => {
    //     this.saveToken(token);
    //     console.log('Token refreshed successfully!');
    //     bool = true;
    //   },
    //   (err) => {
    //     if (err.status == 400) console.log(err.error.value);
    //     else console.log('Something went wrong!');
    //     this.removeToken();
    //   }
    // );

    // return bool;
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

  logout(): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/auth/logout`);
  }
}
