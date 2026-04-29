import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
})
export class ResetPassword {
  form: FormGroup;
 
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
 
  get employeeId() {
    return this.form.get('employeeId');
  }
 
  get name() {
    return this.form.get('name');
  }
 
  get newPassword() {
    return this.form.get('newPassword');
  }
 
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
 
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
 
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: Implement password reset logic
    console.log('Reset password:', this.form.value);
    // Navigate back to login
    this.router.navigate(['/login']);
  }
 
  cancel() {
    this.router.navigate(['/login']);
  }
}
 
 