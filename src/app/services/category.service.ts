import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Categories,
  Category,
  CategoryObject,
  ResponseMessage,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiUrl + '/category';
  constructor(private http: HttpClient) {}

  getCategories(params: any): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<CategoryObject> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: Category): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/${id}`, data);
  }

  create(data: Category): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }
}
