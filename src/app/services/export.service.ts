import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  ChartDataResponse,
  ExportEntries,
  ExportObject,
  Exports,
  ResponseMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiUrl = environment.apiUrl + '/export';

  constructor(private http: HttpClient) {}

  getExports(params: any): Observable<Exports> {
    return this.http.get<Exports>(`${this.apiUrl}`, { params });
  }

  getExportEntries(exportId: number): Observable<ExportEntries> {
    return this.http.get<ExportEntries>(`${this.apiUrl}/${exportId}/entries`);
  }

  getById(exportId: number): Observable<ExportObject> {
    return this.http.get<ExportObject>(`${this.apiUrl}/${exportId}`);
  }

  getExportChart(): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.apiUrl}/chart`);
  }

  updateStatus(id: number): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.apiUrl}/${id}/update-status`,
      null
    );
  }
}
