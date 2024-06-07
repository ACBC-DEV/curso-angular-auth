import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import type { Status } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';

import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: Status = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  token = ''
  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token') || ''
      if (!this.token) this.router.navigate(['/login'])
    })
  }
  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue()
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login'])
        },
        error: () => {
          this.status = 'failed';
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
