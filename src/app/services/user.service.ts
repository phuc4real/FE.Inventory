import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
