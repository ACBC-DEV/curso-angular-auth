import { Injectable, inject } from '@angular/core';
import {
  type HttpRequest,
  type HttpHandler,
  type HttpEvent,
  type HttpInterceptor,
  HttpContextToken,
  HttpContext

} from '@angular/common/http';
import { switchMap, type Observable } from 'rxjs';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false)

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true)
}
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      const isValidToekn = this.tokenService.isValidToken()
      if (isValidToekn) return this.addToken(request, next)
      return this.updateAccesTokenRefreshToken(request, next)
    }
    return next.handle(request);

  }
  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      })
      return next.handle(authReq);
    }
    return next.handle(request);
  }
  private updateAccesTokenRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const refreshToken = this.tokenService.getRefreshToken();
    const isValidRefreshToken = this.tokenService.isValidToken();
    if (refreshToken && isValidRefreshToken) {
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap(() => this.addToken(request, next))
      )
    }
    return next.handle(request)
  }
}
