import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsingItemPagination } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsingItemService {
  private apiUrl = environment.apiUrl + '/using-item';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<UsingItemPagination> {
    return this.http.get<UsingItemPagination>(`${this.apiUrl}`, { params });
  }
}
