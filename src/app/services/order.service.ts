import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChartDataResponse,
  Order,
  OrderEntries,
  OrderEntriesUpdate,
  OrderEntryUpdate,
  OrderObject,
  OrderUpdate,
  Orders,
  ResponseMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/order';
  storageKey = 'orderEntries';

  constructor(private http: HttpClient) {}

  getOrders(params: any): Observable<Orders> {
    return this.http.get<Orders>(`${this.apiUrl}`, { params });
  }

  getOrderEntries(): Observable<OrderEntries> {
    return this.http.get<OrderEntries>(`${this.apiUrl}/entries`);
  }

  getById(id: number): Observable<OrderObject> {
    return this.http.get<OrderObject>(`${this.apiUrl}/${id}`);
  }

  getOrderChart(): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.apiUrl}/chart`);
  }

  createOrder(order: OrderUpdate): Observable<OrderObject> {
    return this.http.post<OrderObject>(`${this.apiUrl}`, order);
  }

  updateStatus(id: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/update-status`,
      null
    );
  }

  getEntriesData() {
    let json = sessionStorage.getItem(this.storageKey);
    return json ? (JSON.parse(json) as OrderEntriesUpdate) : null;
  }

  setEntriesData(orderEntries: OrderEntriesUpdate) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(orderEntries));
  }

  addEntry(entry: OrderEntryUpdate) {
    let entries = this.getEntriesData();
    if (entries == null) entries = { data: [] };
    entries.data.push(entry);
    this.setEntriesData(entries);
  }

  removeEntries() {
    sessionStorage.removeItem(this.storageKey);
  }

  removeEntry(itemId: number): boolean {
    let entries = this.getEntriesData();
    if (entries == null) return false;

    let index = entries?.data.findIndex((x) => x.itemId == itemId) ?? 0;
    if (index < 0) return false;

    entries.data.splice(index, 1);
    this.setEntriesData(entries!);
    return true;
  }
}
