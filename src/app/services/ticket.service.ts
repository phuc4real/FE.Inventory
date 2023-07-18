import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketCount } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = environment.apiUrl + '/ticket';

  constructor(private http: HttpClient) {}

  getTicketCount(): Observable<TicketCount> {
    return this.http.get<TicketCount>(`${this.apiUrl}/count`);
  }
}
