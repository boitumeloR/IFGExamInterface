import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../auth/auth.service';

export interface Course {
  CourseID: number;
  CourseName: string;
  DateRegistered: Date;
  RergistrationStatusID: number;
  RegistrationStatusName: string;
  CourseGradeID: number;
  CourseSubject: string;
  CourseGradeLevel: number;
}

export interface AuthCourse {
  Courses: Course[];
  Session: Session;
}
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getCourses(server: string): Observable<AuthCourse> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<AuthCourse>(`${server}/Course/GetLearnerCourses`, session, this.httpOptions);
  }

  availableCourses(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<any>(`${server}/Course/AvailableCourses`, session, this.httpOptions);
  }

  enrollCourses(server: string, enrollment: any): Observable<any> {
    return this.http.post<any>(`${server}/Course/RegisterCourses`, enrollment, this.httpOptions);
  }

  deregisterCourse(server: string, course: any): Observable<any> {
    const dereg = {
      ...course,
      // tslint:disable-next-line: no-non-null-assertion
      Session: JSON.parse(sessionStorage.getItem('session')!)
    };
    return this.http.post<any>(`${server}/Course/RegisterCourses`, dereg, this.httpOptions);
  }
}
