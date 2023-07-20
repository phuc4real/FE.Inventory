import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';
  authTokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/info`);
  }

  getList(params: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list`, { params });
  }
}
