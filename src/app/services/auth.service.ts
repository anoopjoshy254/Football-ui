import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from '../models/auth.models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5162/api/auth';
  
  private tokenKey = 'jwt_token';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  private loadToken() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.currentUserSubject.next(decoded);
      } catch {
        this.logout();
      }
    }
  }

  public get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  public get currentUser() {
    return this.currentUserSubject.value;
  }

  public get isAdmin() {
    const user = this.currentUser;
    return user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(request: RegisterRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.setToken(response.token))
    );
  }

  login(request: LoginRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.setToken(response.token))
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const decoded = jwtDecode(token);
    this.currentUserSubject.next(decoded);
  }
}
