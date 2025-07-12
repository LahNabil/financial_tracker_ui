import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user?: any;
  constructor(private router: Router) {
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
