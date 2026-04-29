import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.html',
  styleUrls: ['./task.css'],
})
export class TaskComponent {
  constructor(private router: Router) {}

  onViewTasks(): void {
    this.router.navigate(['/view-tasks']);
  }

  onCreateTask(): void {
    this.router.navigate(['/create-task']);
  }
}
 
 


 
 