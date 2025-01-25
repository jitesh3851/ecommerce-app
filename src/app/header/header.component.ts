import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SessionTimeoutService } from '../session-timeout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionTimeoutService: SessionTimeoutService
  ) {}

  logout(): void {
    this.sessionTimeoutService.stopMonitoring(); // Stop monitoring inactivity
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
