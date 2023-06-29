import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = environment.apiUrl;
  private items: Item[] = [
    {
      id: '1',
      name: 'Item 1',
      description: 'Description 1',
      imageUrl: 'path/to/image1.jpg',
      catalog: {
        id: 1,
        name: 'Catalog 1',
      },
      inStock: 10,
      used: 5,
      createdDate: new Date(),
      createdByUser: {
        id: 'user1',
        userName: 'user1',
        email: 'user1@example.com',
        firstName: 'User',
        lastName: '1',
      },
      lastModifiedDate: new Date(),
      modifiedByUser: {
        id: 'user1',
        userName: 'user1',
        email: 'user1@example.com',
        firstName: 'User',
        lastName: '1',
      },
    },
    {
      id: '2',
      name: 'Item 2',
      description: 'Description 2',
      imageUrl: 'path/to/image2.jpg',
      catalog: {
        id: 2,
        name: 'Catalog 2',
      },
      inStock: 5,
      used: 2,
      createdDate: new Date(),
      createdByUser: {
        id: 'user2',
        userName: 'user2',
        email: 'user2@example.com',
        firstName: 'User',
        lastName: '2',
      },
      lastModifiedDate: new Date(),
      modifiedByUser: {
        id: 'user2',
        userName: 'user2',
        email: 'user2@example.com',
        firstName: 'User',
        lastName: '2',
      },
    },
  ];
  constructor(private http: HttpClient) {}

  getItems(params: any): Observable<Item[]> {
    return of(this.items);
    // return this.http.get<Item[]>(`${this.apiUrl}/item`, { params });
  }
}
