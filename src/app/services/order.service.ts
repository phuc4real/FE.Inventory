import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChartDataResponse,
  OrderRecord,
  OrderEntries,
  OrderEntriesUpdate,
  OrderEntryUpdate,
  OrderRecordObject,
  OrderUpdate,
  OrderRecords,
  ResponseMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/order';
  storageKey = 'orderEntries';

  constructor(private http: HttpClient) {}

  getOrders(params: any): Observable<OrderRecords> {
    return this.http.get<OrderRecords>(`${this.apiUrl}`, { params });
  }

  getOrderEntries(recordId: number): Observable<OrderEntries> {
    return this.http.get<OrderEntries>(`${this.apiUrl}/${recordId}/entry`);
  }

  getById(recordId: number): Observable<OrderRecordObject> {
    return this.http.get<OrderRecordObject>(`${this.apiUrl}/${recordId}`);
  }

  getOrderChart(): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.apiUrl}/chart`);
  }

  createOrder(order: OrderUpdate): Observable<OrderRecordObject> {
    return this.http.post<OrderRecordObject>(`${this.apiUrl}`, order);
  }

  cancelOrder(orderId: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.apiUrl}/${orderId}/cancel`
    );
  }

  updateStatus(orderId: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${orderId}/update-status`,
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
    sessionStorage.setItem(this.storageKey, '');
    // sessionStorage.removeItem(this.storageKey);
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
