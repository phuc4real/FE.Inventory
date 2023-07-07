import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, OrderPagination } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) {}

  getPaginationOrder(params: any): Observable<OrderPagination> {
    return this.http.get<OrderPagination>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder() {}

  cancelOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/cancel`);
  }
}
