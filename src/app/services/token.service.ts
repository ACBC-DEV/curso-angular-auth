import { Injectable } from '@angular/core';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  TRELLO_TOKEN = 'token-trello' as const;
  TRELLO_REFRESH_TOKEN = 'refresh-token-trello' as const;
  saveToken(token: string) {
    setCookie(this.TRELLO_TOKEN, token, { expires: 20, path: '/' });
  }
  getToken() {
    return getCookie(this.TRELLO_TOKEN);
  }
  removeToken() {
    removeCookie(this.TRELLO_TOKEN);
  }
  saveRefreshToken(token: string) {
    setCookie(this.TRELLO_REFRESH_TOKEN, token, { expires: 20, path: '/' });
  }
  getRefreshToken() {
    return getCookie(this.TRELLO_REFRESH_TOKEN);
  }
  removeRefreshToken() {
    removeCookie(this.TRELLO_REFRESH_TOKEN);
  }
  isValidToken() {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = jwtDecode<JwtPayload>(token);

    if (decodedToken?.exp) {
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodedToken.exp)

      return tokenDate.getTime() > Date.now();
    }
    return false;
  }
  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) return false;
    const decodedToken = jwtDecode<JwtPayload>(token);

    if (decodedToken?.exp) {
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodedToken.exp)

      return tokenDate.getTime() > Date.now();
    }
    return false;
  }
}
