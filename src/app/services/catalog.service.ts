import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Catalog, CatalogEdit, CatalogPagination } from '../models/catalog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = environment.apiUrl + '/catalog';
  constructor(private http: HttpClient) {}

  getListCatalog(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/list`);
  }

  getCatalogs(params: any): Observable<CatalogPagination> {
    return this.http.get<CatalogPagination>(`${this.apiUrl}`, { params });
  }

  deleteCatalog(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateCatalog(id: number, data: CatalogEdit): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  addCatalog(data: CatalogEdit): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }

  getById(id: number): Observable<Catalog> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
