import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionTimeoutService } from './session-timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-app';


  isLoggedIn = false;

  constructor(private authService: AuthService,
    private sessionTimeoutService: SessionTimeoutService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.sessionTimeoutService.startMonitoring(); // Start monitoring on login
      } else {
        this.sessionTimeoutService.stopMonitoring(); // Stop monitoring on logout
      }
    });
  }
}
