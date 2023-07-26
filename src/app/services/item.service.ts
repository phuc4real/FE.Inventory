import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Item,
  UpdateItem,
  ItemPagaination,
  ResponseMessage,
  ItemDetail,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = environment.apiUrl + '/item';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<ItemPagaination> {
    return this.http.get<ItemPagaination>(`${this.apiUrl}`, { params });
  }

  getList(params: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/list`, { params });
  }

  getById(id: string): Observable<ItemDetail> {
    return this.http.get<ItemDetail>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: UpdateItem): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }

  create(data: UpdateItem): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }
}
