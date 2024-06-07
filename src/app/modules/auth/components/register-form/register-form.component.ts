import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import type { Status } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';

import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  //FORM
  formUser = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
  })
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [CustomValidators.MatchValidator('password', 'confirmPassword')]
  });
  status: Status = 'init';
  statusUser: Status = 'init';
  showRegister = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  alreadyExists = false;
  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
      this.authService.registerAndLogin(name, email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: ({ error }) => {
          if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            this.alreadyExists = true;
          }
          this.status = 'failed';

        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      this.authService.isAvailable(email ?? '').subscribe({
        next: (rta) => {
          this.status = 'success';
          if (rta.isAvailable) {
            this.form.controls.email.setValue(email ?? "");
            this.showRegister = true;
          } else this.router.navigate(['/login'], { queryParams: { email } });

        },
        error: () => {
          this.status = 'failed';
        }
      })
    }
  }

}
