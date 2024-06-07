import { Injectable, inject } from '@angular/core';
import { type CanActivateFn, Router, } from '@angular/router';
import { TokenService } from '@services/token.service';

export const AuthGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService)
  const router = inject(Router)
  const token = tokenService.getToken()
  if (!token) {
    router.navigate(['/login'])
    return false
  }
  return true
}


