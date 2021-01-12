import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Session {
  EmailAddress: string;
  Password: string;
  SessionID: string;
  SessionExpiry: Date;
  UserSecret: string;
  UserRoleID: number | null;
  CentreID: number | null;
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
  constructor() { }

  get isLoggedIn() {
    const session = sessionStorage.getItem('session');

    if (session) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }
}
