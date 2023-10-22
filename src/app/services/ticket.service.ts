import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ChartDataResponse,
  ResponseMessage,
  Ticket,
  TicketEntries,
  TicketObject,
  Tickets,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = environment.apiUrl + '/ticket';

  constructor(private http: HttpClient) {}

  getTickets(params: any): Observable<Tickets> {
    return this.http.get<Tickets>(`${this.apiUrl}`, { params });
  }

  getTicketEntries(exportId: number): Observable<TicketEntries> {
    return this.http.get<TicketEntries>(`${this.apiUrl}/${exportId}/entries`);
  }

  getById(exportId: number): Observable<TicketObject> {
    return this.http.get<TicketObject>(`${this.apiUrl}/${exportId}`);
  }

  getTicketChart(): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.apiUrl}/chart`);
  }

  updateStatus(id: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/update-status`,
      null
    );
  }

  // decide(id: number, decision: UpdateDecision): Observable<ResponseMessage> {
  //   return this.http.put<ResponseMessage>(
  //     `${this.apiUrl}/${id}/decide`,
  //     decision
  //   );
  // }

  // leaderDecide(
  //   id: number,
  //   decision: UpdateDecision
  // ): Observable<ResponseMessage> {
  //   return this.http.put<ResponseMessage>(
  //     `${this.apiUrl}/${id}/leader-decide`,
  //     decision
  //   );
  // }

  // // LocalStorage //

  // initObject() {
  //   let object: UpdateTickerInfo = {
  //     purpose: 0,
  //     title: '',
  //     description: '',
  //     details: [],
  //   };

  //   return object;
  // }

  // getObject() {
  //   let json = localStorage.getItem('ticket');
  //   return json ? (JSON.parse(json) as UpdateTickerInfo) : null;
  // }

  // setObject(object: UpdateTickerInfo) {
  //   localStorage.setItem('ticket', JSON.stringify(object));
  // }

  // removeObject() {
  //   localStorage.removeItem('ticket');
  // }

  // addToObject(detail: UpdateTicketDetail) {
  //   let object = this.getObject();
  //   if (object == null) object = this.initObject();
  //   object.details.push(detail);

  //   this.setObject(object);
  // }

  // removeFromObject(itemId: number): boolean {
  //   let object = this.getObject();
  //   if (object == null) return false;

  //   let index = object?.details.findIndex((x) => x.itemId == itemId) ?? 0;
  //   if (index < 0) return false;

  //   object.details.splice(index, 1);

  //   this.setObject(object);
  //   return true;
  // }
}
