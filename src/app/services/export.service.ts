import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Export, ExportPagination } from '../models/export';
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
}
