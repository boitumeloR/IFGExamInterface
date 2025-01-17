import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getAllLearners(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<any>(`${server}/Learner/GetAllLearners`, session, this.httpOptions);
  }

  getAllDeregistrations(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<any>(`${server}/Learner/GetDeregistrations`, session, this.httpOptions);
  }

  applyFilters(server: string, filterData: any): Observable<any> {
    return this.http.post<any>(`${server}/Learner/ApplyFilters`, filterData, this.httpOptions);
  }

  approveDeregistration(server: string, deregData: any): Observable<any> {
    return this.http.post<any>(`${server}/Learner/ApproveDeregistration`, deregData, this.httpOptions);
  }

  getLearnerCentres(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.get<any>(`${server}/Learner/GetLearnerCentres`, session);
  }

  getLearnerCourses(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.get<any>(`${server}/Learner/GetLearnerCourses`, session);
  }

  getLearnersEnrolled(server: string, learnerData: any): Observable<any> {
    return this.http.post<any>(`${server}/Learner/GetCourseLearners`, learnerData, this.httpOptions);
  }

  assignMark(server: string, learnerData: any): Observable<any> {
    return this.http.post<any>(`${server}/Learner/AssignMark`, learnerData, this.httpOptions);
  }
}
