import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item, ItemDTO } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getItems(params: any): Observable<ItemDTO> {
    return this.http.get<ItemDTO>(`${this.apiUrl}/item`, { params });
  }

  getById(id: any): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/item/${id}`);
  }
}
