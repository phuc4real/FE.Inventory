import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item, ItemEditDTO, ItemPagaination } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = environment.apiUrl + '/item';

  constructor(private http: HttpClient) {}

  getItems(params: any): Observable<ItemPagaination> {
    return this.http.get<ItemPagaination>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  updateItem(id: string, data: ItemEditDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addItem(data: ItemEditDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }
}
