import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item, ItemEdit, ItemPagaination, ResponseMessage } from '../models';

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

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  updateItem(id: string, data: ItemEdit): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/${id}`, data);
  }

  deleteItem(id: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }

  addItem(data: ItemEdit): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }
}
