import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Export, ExportPagination, ResponseMessage } from '../models';
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

  getList(): Observable<Export[]> {
    return this.http.get<Export[]>(`${this.apiUrl}/list`);
  }

  getById(id: number): Observable<Export> {
    return this.http.get<Export>(`${this.apiUrl}/${id}`);
  }

  getCount(): Observable<ResponseMessage[]> {
    return this.http.get<ResponseMessage[]>(`${this.apiUrl}/count-by-month`);
  }

  updateStatus(id: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/update-status`,
      null
    );
  }
}
