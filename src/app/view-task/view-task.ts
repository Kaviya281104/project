import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-task.html',
  styleUrls: ['./view-task.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaskComponent {
  constructor(public taskService: TaskService, private router: Router) {}

  onCreateTask(): void {
    this.router.navigate(['/create-task']);
  }
}
