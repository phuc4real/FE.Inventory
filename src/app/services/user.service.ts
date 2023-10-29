import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, last } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IdentityModel, UserObject, Users } from '../models';

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

  getUserInfoById(id: string): Observable<UserObject> {
    return this.http.get<UserObject>(`${this.apiUrl}/info/${id}`);
  }

  getFullName(): string {
    return localStorage.getItem(this.storageKey) ?? '';
  }

  setFullName(name: string) {
    localStorage.setItem(this.storageKey, name);
  }

  removeFullName() {
    localStorage.removeItem(this.storageKey);
  }
}
