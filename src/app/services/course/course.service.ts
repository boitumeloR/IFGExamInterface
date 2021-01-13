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
}
