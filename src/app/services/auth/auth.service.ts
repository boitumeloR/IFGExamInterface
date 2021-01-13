import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Session {
  EmailAddress: string;
  Password: string;
  SessionID: string;
  SessionExpiry: Date;
  UserSecret: string;
  UserRoleID: number | null;
  UserRoleName: string;
  CentreID: number | null;
  Error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  get isLoggedIn(): Observable<boolean> {
    const session = sessionStorage.getItem('session');

    if (session) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }

  Login(server: string, loginObj: any): Observable<Session> {
    return this.http.post<Session>(`${server}/Auth/Login`, loginObj, this.httpOptions);
  }

  registerAuth(server: string, authObj: any): Observable<any> {
    return this.http.post<any>(`${server}/Registration/RegisterAuth`, authObj, this.httpOptions);
  }

  getCentres(server: string): Observable<any[]> {
    return this.http.get<any[]>(`${server}/Registration/GetCentres`);
  }

  getGrades(server: string): Observable<any[]> {
    return this.http.get<any[]>(`${server}/Registration/GetGrades`);
  }
}
