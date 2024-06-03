import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  login(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/login`, {
      email,
      password
    })
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/register`, {
      name,
      email,
      password
    })
  }
}
