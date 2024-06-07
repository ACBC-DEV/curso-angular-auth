import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  TRELLO_TOKEN = 'token-trello' as const;
  saveToken(token: string) {

    setCookie(this.TRELLO_TOKEN, token, { expires: 20, path: '/' });
  }
  getToken() {
    return getCookie(this.TRELLO_TOKEN);
  }
  removeToken() {
    removeCookie(this.TRELLO_TOKEN);
  }
}
