import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setToken(value: any, save: boolean) {
    sessionStorage.setItem('token', JSON.stringify(value));
    if (save) {
      localStorage.setItem('token', JSON.stringify(value));
    }
  }

  getToken() {
    const token = sessionStorage.getItem('token');
    if (token) {
      return token;
    }
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  login(
    email: string,
    password: string,
    remember: boolean
  ): Observable<boolean> {
    this.setToken({ email, password }, remember);
    return this.returnObservable(true);
  }

  logout(): Observable<boolean> {
    this.removeToken();
    return this.returnObservable(true);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  returnObservable(value: any): Observable<boolean> {
    return of(value).pipe(delay(2000));
  }
}
