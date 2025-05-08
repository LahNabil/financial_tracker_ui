import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../services/services';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }
  login() {
    this.router.navigate(['login']);
  }
  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.errorMsg = err.error?.validationErrors;
        }
      });
  }


}
