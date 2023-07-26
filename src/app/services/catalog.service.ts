import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Catalog,
  UpdateCatalog,
  CatalogPagination,
  ResponseMessage,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = environment.apiUrl + '/catalog';
  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<CatalogPagination> {
    return this.http.get<CatalogPagination>(`${this.apiUrl}`, { params });
  }

  getList(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/list`);
  }

  getById(id: number): Observable<Catalog> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: UpdateCatalog): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/${id}`, data);
  }

  create(data: UpdateCatalog): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }
}
