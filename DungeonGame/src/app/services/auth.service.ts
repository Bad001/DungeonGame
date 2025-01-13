// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Register a new user
  signup(email: string, nickname: string, password: string): Observable<any> {
    const body = { email, nickname, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('/auth/signup', body, { headers });
  }

  // Sign in an existing user
  signin(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send the request
    return this.http.post('/auth/signin', body, { headers });
  }

  // Store the JWT token in localStorage
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get the stored JWT token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Clear the JWT token from localStorage
  logout(): void {
    localStorage.removeItem('auth_token');
  }
}