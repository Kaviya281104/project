import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [],
  templateUrl: './application.html',
  styleUrls: ['./application.css'],
})
export class ApplicationComponent {
  constructor(private router: Router) {}

  navigateToCreateApplication(): void {
    this.router.navigate(['/create-application']);
  }

  navigateToViewApplications(): void {
    this.router.navigate(['/view-application']);
  }
}
 
 