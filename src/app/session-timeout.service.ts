import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {

  private inactivityTime = 60 * 1000; // 1 minute in milliseconds
  private activitySubscription!: Subscription;
  private timerSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  startMonitoring(): void {
    // Merge multiple user activity events
    const activityEvents = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'click')
    );

    // Stop any existing subscriptions
    this.stopMonitoring();

    // Monitor user activity
    this.activitySubscription = activityEvents
      .pipe(
        debounceTime(500), // Avoid firing too frequently
        switchMap(() => timer(this.inactivityTime)) // Reset timer on activity
      )
      .subscribe(() => {
        this.zone.run(() => {
          this.logout(); // Trigger logout after inactivity
        });
      });
  }

  stopMonitoring(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private logout(): void {
    this.authService.logout(); // Call AuthService to log out
    this.router.navigate(['/login']); // Redirect to login page
    alert('You have been logged out due to inactivity.');
  }
}
