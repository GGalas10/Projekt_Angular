import { Component } from '@angular/core';
import { AuthService } from '../../Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false,
})
export class HeaderComponent {
  isLogin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.IsLogin.subscribe({
      next: (value) => (this.isLogin = Boolean(value)),
    });
  }
  Logout() {
    this.authService.LogoutUser();
    this.router.navigate(['/']);
  }
}
