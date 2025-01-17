import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../auth/auth.service';

export interface Course {
  CourseID: number;
  CourseName: string;
  CourseDescription: string;
  DateRegistered: Date;
  RegistrationStatusID: number;
  RegistrationStatusName: string;
  CourseGradeID: number;
  CourseMark: number;
  LessonFrequency: number;
  CourseSubject: string;
  CourseComments: string;
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

  getAdminCourses(server: string): Observable<AuthCourse> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<AuthCourse>(`${server}/Course/AdminCourses`, session, this.httpOptions);
  }

  getLearnerSubjects(server: string): Observable<any> {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    return this.http.post<any>(`${server}/Course/GetLearnerSubjects`, session, this.httpOptions);
  }

  getSubjectCourses(server: string, subjectID: number): Observable<any> {
    return this.http.get<any>(`${server}/Course/GetSubjectCourses?subjectID=${subjectID}`);
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
    return this.http.post<any>(`${server}/Course/DeregisterCourse`, course, this.httpOptions);
  }

  addCourse(server: string, course: any): Observable<any> {
    return this.http.post<any>(`${server}/Course/AddCourse`, course, this.httpOptions);
  }

  updateCourse(server: string, course: any): Observable<any> {
    return this.http.post<any>(`${server}/Course/UpdateCourse`, course, this.httpOptions);
  }

  deleteCourse(server: string, course: any): Observable<any> {
    return this.http.post<any>(`${server}/Course/DeleteCourse`, course, this.httpOptions);
  }

  getCourseCentres(server: string): Observable<any[]> {
    return this.http.get<any[]>(`${server}/Course/GetCourseCentres`);
  }

  getCourseGrades(server: string): Observable<any[]> {
    return this.http.get<any[]>(`${server}/Course/GetCourseGrades`);
  }

  getCourseSubjects(server: string): Observable<any[]> {
    return this.http.get<any[]>(`${server}/Course/GetCourseSubjects`);
  }

  checkModification(server: string, course: any): Observable<any>{
    return this.http.post<any>(`${server}/Course/CheckModificationStatus`, course, this.httpOptions);
  }

}
