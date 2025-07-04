import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];


  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService
  ){

  }

  register() {
    this.router.navigate(['register'])
    
  }
  login() {
    console.log("event clicked")
    this.errorMsg = [];
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (res) => {
        console.log("------------------------ before checking", res)
        if(res.token){
          console.log("received token ", res.token)
          this.tokenService.token = res.token as string;
          console.log('Stored token:', this.tokenService.token); 
          this.router.navigate(['']);
        }
      },
      error: async (err) => {
        console.log(err);
  
        // Check if error is a Blob and try to parse it
        if (err.error instanceof Blob && err.error.type === 'application/json') {
          const errorText = await err.error.text();
          const errorJson = JSON.parse(errorText);
  
          if (errorJson.validationErrors) {
            this.errorMsg = errorJson.validationErrors;
          } else {
            this.errorMsg = [errorJson.errorMsg || 'Unknown error occurred'];
          }
        } else if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg = [err.error?.errorMsg || 'Login failed'];
        }
      }
    });
  }
  

  
}
