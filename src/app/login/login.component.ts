import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SessionTimeoutService } from '../session-timeout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private sessionTimeoutService: SessionTimeoutService
  )
     {}



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/home']); // Redirect logged-in users to home
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    // Replace this with actual authentication logic
    const isAuthenticated = true;

    if (isAuthenticated) {
      this.authService.login(); // Notify AuthService about login
      this.router.navigate(['/home']); // Redirect to home page
    } else {
      alert('Invalid credentials');
    }

    // Dummy authentication logic (replace with real API call)
    const { email, password } = this.loginForm.value;
    if (email === 'user@example.com' && password === 'password123') {
      // On successful login, navigate to the homepage
      this.router.navigate(['/home']);
      this.sessionTimeoutService.startMonitoring(); // Start monitoring inactivity
    } else {
      alert('Invalid credentials, please try again.');
    }
  }

}
