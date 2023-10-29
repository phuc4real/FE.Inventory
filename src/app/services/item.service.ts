import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ItemCompactObject,
  ItemObject,
  ItemUpdate,
  Items,
  ResponseMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = environment.apiUrl + '/item';

  constructor(private http: HttpClient) {}

  getItems(params: any): Observable<Items> {
    return this.http.get<Items>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<ItemObject> {
    return this.http.get<ItemObject>(`${this.apiUrl}/${id}`);
  }

  getByIdCompact(id: number): Observable<ItemCompactObject> {
    return this.http.get<ItemCompactObject>(`${this.apiUrl}/${id}/compact`);
  }

  update(id: number, data: ItemUpdate): Observable<ItemUpdate> {
    return this.http.put<ItemUpdate>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }

  create(data: ItemUpdate): Observable<ItemObject> {
    return this.http.post<ItemObject>(`${this.apiUrl}`, data);
  }
}
