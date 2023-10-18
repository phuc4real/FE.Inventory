import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IdentityModel, UserObject, Users } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';
  storageKey = 'identity';
  constructor(private http: HttpClient) {}

  getList(params: any): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/list`, { params });
  }

  getUserName() {
    let json = sessionStorage.getItem(this.storageKey) ?? '';
    let user = JSON.parse(json) as IdentityModel;
    return user.userName;
  }

  getUserInfo(): Observable<UserObject> {
    return this.http.get<UserObject>(`${this.apiUrl}/info`);
  }

  getUserInfoById(id: string): Observable<UserObject> {
    return this.http.get<UserObject>(`${this.apiUrl}/info/${id}`);
  }
}
