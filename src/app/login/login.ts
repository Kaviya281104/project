 
 
 
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
 
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  get employeeId() {
    return this.form.get('employeeId');
  }
 
  get password() {
    return this.form.get('password');
  }
 
  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.router.navigate(['/dashboard']);
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
 