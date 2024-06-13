import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import type { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private authServices = inject(AuthService)
  private tokenService = inject(TokenService)
  private router = inject(Router)
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user: User | null = null;

  ngOnInit() {
    this.authServices.getProfile().subscribe((user) => {
      this.user = user;
    });
  }
  logout() {
    this.authServices.logout()
    this.router.navigate(['/login'])
  }
  isValidToken() {
    const rta = this.tokenService.isValidToken()
    console.log(rta)
  }

}
