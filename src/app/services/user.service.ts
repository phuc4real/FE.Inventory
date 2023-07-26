import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  getList(params: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list`, { params });
  }

  getUserInfo(): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}/info`);
  }

  getUserInfoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/info/${id}`);
  }
}
