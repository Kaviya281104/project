 
 
 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  form: FormGroup;
  selectedRole: 'employee' | 'admin' = 'employee';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      credentials: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get credentialsLabel(): string {
    return this.selectedRole === 'employee' ? 'Employee ID' : 'Admin ID';
  }

  get credentialsPlaceholder(): string {
    return this.selectedRole === 'employee' 
      ? 'Enter your employee ID' 
      : 'Enter your admin ID';
  }

  get credentials() {
    return this.form.get('credentials');
  }

  get password() {
    return this.form.get('password');
  }

  setRole(role: 'employee' | 'admin') {
    this.selectedRole = role;
    
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Existing login logic - reusing for both roles
    // The role is now available via this.selectedRole and can be passed to any backend API
    const navigationPath = this.selectedRole === 'employee' 
      ? '/employee-dashboard' 
      : '/dashboard';
    this.router.navigate([navigationPath]);
  }

  newUser() {
    // Navigate to employee page for new user registration
    this.router.navigate(['/employee']);
  }

  resetPassword() {
    // Navigate to password reset page
    this.router.navigate(['/reset-password']);
  }
}
 