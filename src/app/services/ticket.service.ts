import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ChartDataResponse,
  ResponseMessage,
  TicketEntries,
  TicketEntriesUpdate,
  TicketEntryUpdate,
  TicketRecordObject,
  TicketRecords,
  TicketSummaryObject,
  TicketUpdate,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  storageKey = 'ticketEntries';
  private apiUrl = environment.apiUrl + '/ticket';

  constructor(private http: HttpClient) {}

  getTickets(params: any): Observable<TicketRecords> {
    return this.http.get<TicketRecords>(`${this.apiUrl}`, { params });
  }

  getTicketEntries(recordId: number): Observable<TicketEntries> {
    return this.http.get<TicketEntries>(`${this.apiUrl}/${recordId}/entries`);
  }

  getById(recordId: number): Observable<TicketRecordObject> {
    return this.http.get<TicketRecordObject>(`${this.apiUrl}/${recordId}`);
  }

  getTicketSummary(): Observable<TicketSummaryObject> {
    return this.http.get<TicketSummaryObject>(`${this.apiUrl}/summary`);
  }

  createTicket(ticket: TicketUpdate): Observable<TicketRecordObject> {
    return this.http.post<TicketRecordObject>(`${this.apiUrl}`, ticket);
  }

  cancelTicket(ticketId: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.apiUrl}/${ticketId}/cancel`
    );
  }

  updateStatus(ticketId: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${ticketId}/update-status`,
      null
    );
  }

  getEntriesData() {
    let json = sessionStorage.getItem(this.storageKey);
    return json ? (JSON.parse(json) as TicketEntriesUpdate) : null;
  }

  setEntriesData(orderEntries: TicketEntriesUpdate) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(orderEntries));
  }

  addEntry(entry: TicketEntryUpdate) {
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
