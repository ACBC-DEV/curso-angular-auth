import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.prod'
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import type { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor'

type recoveryResponse = {
  link: string,
  recoveryToken: string
}

type loginResponse = {
  access_token: string,
  refresh_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private tokenService = inject(TokenService)
  apiURL = environment.API_URL
  login(email: string, password: string) {
    return this.http.post<loginResponse>(`${this.apiURL}/api/v1/auth/login`, {
      email,
      password
    }).pipe(tap(Response => {
      this.tokenService.saveToken(Response.access_token)
      this.tokenService.saveRefreshToken(Response.refresh_token)
    }))
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, {
      name,
      email,
      password
    })
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(switchMap(() => this.login(email, password)))
  }
  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(`${this.apiURL}/api/v1/auth/is-available`, { email })

  }
  recovery(email: string) {
    return this.http.post<recoveryResponse>(`${this.apiURL}/api/v1/auth/recovery`, { email })
  }
  changePassword(token: string, newPassword: string,) {
    return this.http.post<recoveryResponse>(`${this.apiURL}/api/v1/auth/change-password`, { newPassword, token })
  }
  logout() {
    this.tokenService.removeToken()
  }
  getProfile() {
    return this.http.get<User>(`${this.apiURL}/api/v1/auth/profile`, {
      context: checkToken()
    })
  }
  refreshToken(refreshToken: string) {
    return this.http.post<loginResponse>(`${this.apiURL}/api/v1/auth/refresh-token`, { refreshToken }).pipe(tap(Response => {
      this.tokenService.saveToken(Response.access_token)
      this.tokenService.saveRefreshToken(Response.refresh_token)
    }))
  }
}
