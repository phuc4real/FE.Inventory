import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AddExport,
  AddExportDetail,
  Export,
  ExportPagination,
  ResponseMessage,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiUrl = environment.apiUrl + '/export';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<ExportPagination> {
    return this.http.get<ExportPagination>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Export> {
    return this.http.get<Export>(`${this.apiUrl}/${id}`);
  }

  cancelExport(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}/cancel`);
  }

  addExport(description: string): Observable<any> {
    let data = this.getObject();
    data!.description = description;
    return this.http.post(`${this.apiUrl}`, data, { observe: 'response' });
  }

  // LocalStorage //

  initObject() {
    let object: AddExport = {
      description: '',
      details: [],
    };

    return object;
  }

  getObject() {
    let json = localStorage.getItem('export');
    return json ? (JSON.parse(json) as AddExport) : null;
  }

  setObject(object: AddExport) {
    localStorage.setItem('export', JSON.stringify(object));
  }

  removeObject() {
    localStorage.removeItem('export');
  }

  addToObject(itemId: string, quantity: number, userId: string) {
    let item: AddExportDetail = {
      itemId: itemId,
      quantity: quantity,
      forUserId: userId,
    };

    let object = this.getObject();
    if (object == null) object = this.initObject();
    object.details.push(item);
    this.setObject(object);
  }

  removeFromObject(itemId: string): boolean {
    let object = this.getObject();
    if (object == null) return false;

    let index = object?.details.findIndex((x) => x.itemId == itemId) ?? 0;
    if (index < 0) return false;

    object.details.splice(index, 1);

    this.setObject(object);
    return true;
  }
}
