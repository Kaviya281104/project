import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class EmployeeComponent {
  form: FormGroup;
 
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      location: ['', Validators.required],
      lead: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
 
  get employeeId() {
    return this.form.get('employeeId');
  }
 
  get name() {
    return this.form.get('name');
  }
 
  get location() {
    return this.form.get('location');
  }
 
  get lead() {
    return this.form.get('lead');
  }
 
  get password() {
    return this.form.get('password');
  }
 
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
 
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
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
    // TODO: Implement employee creation logic
    console.log('Create employee:', this.form.value);
    this.router.navigate(['/dashboard']);
  }
 
  cancel() {
    this.router.navigate(['/login']);
  }
}
 
 