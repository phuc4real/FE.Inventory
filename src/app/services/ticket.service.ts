import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AddTicket,
  AddTicketDetail,
  ResponseMessage,
  Ticket,
  TicketCount,
  TicketPagination,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = environment.apiUrl + '/ticket';

  constructor(private http: HttpClient) {}

  getPagination(params: any): Observable<TicketPagination> {
    return this.http.get<TicketPagination>(`${this.apiUrl}`, { params });
  }

  getTicketCount(): Observable<TicketCount> {
    return this.http.get<TicketCount>(`${this.apiUrl}/count`);
  }

  getList(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/list`);
  }

  addTicket(data: AddTicket): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }

  getById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  cancelTicket(id: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}`);
  }
  // LocalStorage //

  initObject() {
    let object: AddTicket = {
      purpose: 0,
      title: '',
      description: '',
      details: [],
    };

    return object;
  }

  getObject() {
    let json = localStorage.getItem('ticket');
    return json ? (JSON.parse(json) as AddTicket) : null;
  }

  setObject(object: AddTicket) {
    localStorage.setItem('ticket', JSON.stringify(object));
  }

  removeObject() {
    localStorage.removeItem('ticket');
  }

  addToObject(itemId: string, quantity: number, type: number) {
    let item: AddTicketDetail = {
      itemId: itemId,
      quantity: quantity,
      type: parseInt(type.toString()),
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
