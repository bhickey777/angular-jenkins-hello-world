import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly baseUrl = environment.reportingUrl + '/api/reports';

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
