import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ExportPagination,
  Export,
  AddRecipt,
  AddReceiptDetail,
  ResponseMessage,
  ReceiptPagination,
  Receipt,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private apiUrl = environment.apiUrl + '/receipt';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<ReceiptPagination> {
    return this.http.get<ReceiptPagination>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.apiUrl}/${id}`);
  }

  getCount(): Observable<ResponseMessage[]> {
    return this.http.get<ResponseMessage[]>(`${this.apiUrl}/count-by-month`);
  }

  addExport(description: string): Observable<any> {
    let data = this.getObject();
    return this.http.post(`${this.apiUrl}`, data, { observe: 'response' });
  }

  // LocalStorage //

  initObject() {
    let object: AddRecipt = {
      itemCount: 0,
      details: [],
    };

    return object;
  }

  getObject() {
    let json = localStorage.getItem('receipt');
    return json ? (JSON.parse(json) as AddRecipt) : null;
  }

  setObject(object: AddRecipt) {
    localStorage.setItem('receipt', JSON.stringify(object));
  }

  removeObject() {
    localStorage.removeItem('receipt');
  }

  addToObject(itemId: string, quantity: number) {
    let item: AddReceiptDetail = {
      itemId: itemId,
      quantity: quantity,
    };

    let object = this.getObject();
    if (object == null) object = this.initObject();
    object.details.push(item);
    object.itemCount += item.quantity;
    this.setObject(object);
  }

  removeFromObject(itemId: string): boolean {
    let object = this.getObject();
    if (object == null) return false;

    let index = object?.details.findIndex((x) => x.itemId == itemId) ?? 0;
    if (index < 0) return false;

    let item = object.details[index];

    object.itemCount -= item.quantity;

    object.details.splice(index, 1);

    this.setObject(object);

    return true;
  }
}
