import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard {

  constructor(private router: Router) {}
 
  goToTasks() {
    this.router.navigate(['/tasks']);
  }
 
  logout() {
    this.router.navigate(['/login']);
  }
   // Inside your export class EmployeeDashboardComponent
isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}


  viewTasks() {
    this.router.navigate(['/tasks']);
  }
 
  goToApplications() {
    this.router.navigate(['/applications']);
  }
}
