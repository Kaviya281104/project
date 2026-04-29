import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  constructor(private router: Router) {}
 
  goToTasks() {
    this.router.navigate(['/tasks']);
  }
 
  logout() {
    this.router.navigate(['/login']);
  }
 
  viewTasks() {
    this.router.navigate(['/tasks']);
  }
 
  goToApplications() {
    this.router.navigate(['/applications']);
  }
}
 
 