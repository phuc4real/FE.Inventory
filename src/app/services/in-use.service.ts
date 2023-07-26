import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InUsePagination } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InUserService {
  private apiUrl = environment.apiUrl + '/in-use';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<InUsePagination> {
    return this.http.get<InUsePagination>(`${this.apiUrl}`, { params });
  }
}
