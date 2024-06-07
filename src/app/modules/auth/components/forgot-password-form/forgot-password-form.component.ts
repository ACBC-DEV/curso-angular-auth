import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import type { Status } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {
  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: Status = 'init';
  emailSent = false;

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      // TODO: Connect
      this.authService.recovery(email).subscribe({
        next: () => {
          this.status = 'success';
          this.emailSent = true;
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
