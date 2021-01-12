import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  server = 'https://localhost:00000/api';
  constructor() { }

  getServer() {
    return this.server;
  }
}
