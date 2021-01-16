import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getReportData(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<any>(`${server}/Reporting/PerformanceReport`, session, this.httpOptions);
  }
}
