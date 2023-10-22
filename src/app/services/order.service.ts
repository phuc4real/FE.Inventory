import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChartDataResponse,
  OrderEntries,
  OrderObject,
  Orders,
  ResponseMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //     minTotal: 0,
  //     maxTotal: 0,
  //     description: '',
  //     details: [],
  //   };
  //   return order;
  // }
  // getObject() {
  //   let json = localStorage.getItem('order');
  //   return json ? (JSON.parse(json) as UpdateOrderInfo) : null;
  // }
  // setObject(order: UpdateOrderInfo) {
  //   localStorage.setItem('order', JSON.stringify(order));
  // }
  // addToObject(detail: UpdateOrderDetail) {
  //   let orderInfo = this.getObject();
  //   if (orderInfo == null) orderInfo = this.initObject();
  //   orderInfo.details.push(detail);
  //   orderInfo.minTotal += detail.minTotal;
  //   orderInfo.maxTotal += detail.maxTotal;
  //   this.setObject(orderInfo);
  // }
  // removeObject() {
  //   localStorage.removeItem('order');
  // }
  // removeFromObject(itemId: number): boolean {
  //   let orderInfo = this.getObject();
  //   if (orderInfo == null) return false;
  //   let index = orderInfo?.details.findIndex((x) => x.itemId == itemId) ?? 0;
  //   if (index < 0) return false;
  //   let minTotal = orderInfo?.details[index].minTotal ?? 0;
  //   let maxTotal = orderInfo?.details[index].maxTotal ?? 0;
  //   orderInfo.minTotal -= minTotal;
  //   orderInfo.maxTotal -= maxTotal;
  //   orderInfo.details.splice(index, 1);
  //   this.setObject(orderInfo!);
  //   return true;
  // }
  getCount() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) {}

  getOrders(params: any): Observable<Orders> {
    return this.http.get<Orders>(`${this.apiUrl}`, { params });
  }

  getOrderEntries(): Observable<OrderEntries> {
    return this.http.get<OrderEntries>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<OrderObject> {
    return this.http.get<OrderObject>(`${this.apiUrl}/${id}`);
  }

  getOrderChart(): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.apiUrl}/chart`);
  }

  updateStatus(id: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/update-status`,
      null
    );
  }

  // // LocalStorage //

  // initObject() {
  //   let order: UpdateOrderInfo = {
  //     minTotal: 0,
  //     maxTotal: 0,
  //     description: '',
  //     details: [],
  //   };
  //   return order;
  // }

  // getObject() {
  //   let json = localStorage.getItem('order');
  //   return json ? (JSON.parse(json) as UpdateOrderInfo) : null;
  // }

  // setObject(order: UpdateOrderInfo) {
  //   localStorage.setItem('order', JSON.stringify(order));
  // }

  // addToObject(detail: UpdateOrderDetail) {
  //   let orderInfo = this.getObject();
  //   if (orderInfo == null) orderInfo = this.initObject();

  //   orderInfo.details.push(detail);
  //   orderInfo.minTotal += detail.minTotal;
  //   orderInfo.maxTotal += detail.maxTotal;

  //   this.setObject(orderInfo);
  // }

  // removeObject() {
  //   localStorage.removeItem('order');
  // }

  // removeFromObject(itemId: number): boolean {
  //   let orderInfo = this.getObject();
  //   if (orderInfo == null) return false;
  //   let index = orderInfo?.details.findIndex((x) => x.itemId == itemId) ?? 0;
  //   if (index < 0) return false;

  //   let minTotal = orderInfo?.details[index].minTotal ?? 0;
  //   let maxTotal = orderInfo?.details[index].maxTotal ?? 0;
  //   orderInfo.minTotal -= minTotal;
  //   orderInfo.maxTotal -= maxTotal;
  //   orderInfo.details.splice(index, 1);

  //   this.setObject(orderInfo!);
  //   return true;
  // }
}
