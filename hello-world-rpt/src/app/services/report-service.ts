import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly baseUrl =
    'http://localhost:7200/api/reports';

  constructor(private http: HttpClient) {}

  getAssetClassTotals(): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/assetClassTotals`,
      {
        responseType: 'blob'
      }
    );
  }
  getWeeklyTrends(): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/weeklyTrends`,
      {
        responseType: 'blob'
      }
    );
  }
}
