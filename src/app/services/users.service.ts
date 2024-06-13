import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '@environments/environment.prod';
import type { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)
  private tokenService = inject(TokenService)
  apiURL = environment.API_URL
  getUsers() {
    return this.http.get<User[]>(`${this.apiURL}/api/v1/users`, {
      context: checkToken()
    })
  }
}
