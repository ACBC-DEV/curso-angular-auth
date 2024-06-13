import { inject } from '@angular/core';
import { type CanActivateFn, Router, } from '@angular/router';
import { TokenService } from '@services/token.service';

export const AuthGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  const isValid = tokenService.isValidRefreshToken()
  if (!isValid) {
    router.navigate(['/login'])
    tokenService.removeToken()
    return false
  }
  return true
}



