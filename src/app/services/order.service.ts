import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Order,
  OrderPagination,
  OrderWithHistory,
  ResponseMessage,
  UpdateDecision,
  UpdateOrderDetail,
  UpdateOrderInfo,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<OrderPagination> {
    return this.http.get<OrderPagination>(`${this.apiUrl}`, { params });
  }

  getList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<OrderWithHistory> {
    return this.http.get<OrderWithHistory>(`${this.apiUrl}/${id}`);
  }

  getCount(): Observable<ResponseMessage[]> {
    return this.http.get<ResponseMessage[]>(`${this.apiUrl}/count-by-month`);
  }

  updateStatus(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/update-status`, null);
  }

  decide(id: number, decision: UpdateDecision): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.apiUrl}/${id}/decide`,
      decision
    );
  }

  cancel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/cancel`);
  }

  create(): Observable<any> {
    let data = this.getObject();
    return this.http.post(`${this.apiUrl}`, data, { observe: 'response' });
  }

  // LocalStorage //

  initObject() {
    let order: UpdateOrderInfo = {
      minTotal: 0,
      maxTotal: 0,
      description: '',
      details: [],
    };
    return order;
  }

  getObject() {
    let json = localStorage.getItem('order');
    return json ? (JSON.parse(json) as UpdateOrderInfo) : null;
  }

  setObject(order: UpdateOrderInfo) {
    localStorage.setItem('order', JSON.stringify(order));
  }

  addToObject(detail: UpdateOrderDetail) {
    let orderInfo = this.getObject();
    if (orderInfo == null) orderInfo = this.initObject();

    orderInfo.details.push(detail);
    orderInfo.minTotal += detail.minTotal;
    orderInfo.maxTotal += detail.maxTotal;

    this.setObject(orderInfo);
  }

  removeObject() {
    localStorage.removeItem('order');
  }

  removeFromObject(itemId: string): boolean {
    let orderInfo = this.getObject();
    if (orderInfo == null) return false;
    let index = orderInfo?.details.findIndex((x) => x.itemId == itemId) ?? 0;
    if (index < 0) return false;

    let minTotal = orderInfo?.details[index].minTotal ?? 0;
    let maxTotal = orderInfo?.details[index].maxTotal ?? 0;
    orderInfo.minTotal -= minTotal;
    orderInfo.maxTotal -= maxTotal;
    orderInfo.details.splice(index, 1);

    this.setObject(orderInfo!);
    return true;
  }
}
