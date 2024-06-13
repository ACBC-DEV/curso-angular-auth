import { inject } from '@angular/core';
import { type CanActivateFn, Router, } from '@angular/router';
import { TokenService } from '@services/token.service';

export const RedirectGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  const isValid = tokenService.isValidToken()
  if (isValid) {
    router.navigate(['/app'])

  }
  return true

}

