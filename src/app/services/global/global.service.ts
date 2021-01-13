import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  server = 'https://localhost:44339/api';
  constructor() { }

  getServer(): string {
    return this.server;
  }
}
