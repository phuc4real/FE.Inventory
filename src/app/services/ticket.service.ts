import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ResponseMessage,
  Ticket,
  TicketCount,
  TicketPagination,
  TicketWithHistory,
  UpdateDecision,
  UpdateTickerInfo,
  UpdateTicketDetail,
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

  getList(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/list`);
  }

  getTicketCount(): Observable<TicketCount> {
    return this.http.get<TicketCount>(`${this.apiUrl}/count`);
  }

  getById(id: number): Observable<TicketWithHistory> {
    return this.http.get<TicketWithHistory>(`${this.apiUrl}/${id}`);
  }

  create(data: UpdateTickerInfo): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, { observe: 'response' });
  }

  cancel(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/${id}/cancel`);
  }

  updateStatus(id: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/update-status`,
      null
    );
  }

  decide(id: number, decision: UpdateDecision): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/decide`,
      decision
    );
  }

  leaderDecide(
    id: number,
    decision: UpdateDecision
  ): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/leader-decide`,
      decision
    );
  }

  // LocalStorage //

  initObject() {
    let object: UpdateTickerInfo = {
      purpose: 0,
      title: '',
      description: '',
      details: [],
    };

    return object;
  }

  getObject() {
    let json = localStorage.getItem('ticket');
    return json ? (JSON.parse(json) as UpdateTickerInfo) : null;
  }

  setObject(object: UpdateTickerInfo) {
    localStorage.setItem('ticket', JSON.stringify(object));
  }

  removeObject() {
    localStorage.removeItem('ticket');
  }

  addToObject(detail: UpdateTicketDetail) {
    let object = this.getObject();
    if (object == null) object = this.initObject();
    object.details.push(detail);

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
