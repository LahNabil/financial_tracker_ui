import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileControllerService } from '../../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileControllerService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValues = this.changePasswordForm.value;

    this.profileService.updatePassword({
      body: {
        oldPassword: formValues.currentPassword,
        newPassword: formValues.newPassword
      }
    }).subscribe({
      next: () => {
        this.successMessage = 'Password updated successfully.';
        this.changePasswordForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Failed to change password.';
        this.isSubmitting = false;
      }
    });
  }
}
