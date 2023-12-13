import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, last } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation, Permission, User, UserObject, Users } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';
  storageKey = 'user';

  constructor(private http: HttpClient) {}

  getList(params: any): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/list`, { params });
  }

  getUserInfo(): Observable<UserObject> {
    return this.http.get<UserObject>(`${this.apiUrl}/info`);
  }

  getUserOperation(): Observable<Operation> {
    return this.http.get<Operation>(`${this.apiUrl}/operation`);
  }

  getUserInfoById(id: string): Observable<UserObject> {
    return this.http.get<UserObject>(`${this.apiUrl}/info/${id}`);
  }

  getName(): string {
    let json = localStorage.getItem(this.storageKey);
    let result = json ? (JSON.parse(json) as User) : null;
    if (result == null) return '';
    else return result.firstName + ' ' + result.lastName;
  }

  getRole(): string {
    let json = localStorage.getItem(this.storageKey);
    let result = json ? (JSON.parse(json) as User) : null;
    if (result != null) {
      if (result.permission.isAdmin) return 'Admin';
      if (result.permission.isSuperAdmin) return 'Super Admin';
    }
    return '';
  }

  setUserInfo(user: UserObject) {
    localStorage.setItem(this.storageKey, JSON.stringify(user.data));
  }

  removeName() {
    localStorage.removeItem(this.storageKey);
  }
}
