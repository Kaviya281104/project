import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrls: ['./create-task.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;

  applicationCategories = ['AD', 'AMS', 'CRM', 'EAM', 'ERP'];
  taskTypes = ['Enhancement', 'Analyse', 'Bug Fix', 'Release', 'Support'];
  environments = ['Development', 'Staging', 'Production'];
  statuses = ['Open', 'In Progress', 'Review', 'Completed', 'Blocked'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      applicationCategory: ['', Validators.required],
      type: ['', Validators.required],
      lead: ['', [Validators.required, Validators.minLength(2)]],
      story: ['', [Validators.required, Validators.minLength(5)]],
      task: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      assignedBy: ['', [Validators.required, Validators.minLength(2)]],
      assignedTo: ['', [Validators.required, Validators.minLength(2)]],
      assignedJiraId: ['', [Validators.required, Validators.minLength(3)]],
      environment: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      estimatedHours: [null, [Validators.required, Validators.min(1)]],
      estimatedWorkingHours: [null, [Validators.required, Validators.min(1)]],
      comments: [''],
      milestones: [''],
      estimatedCompletionDate: ['', Validators.required],
      changeRequestNumber: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.createTask(this.taskForm.value);
    this.router.navigate(['/view-tasks']);
  }

  generateTaskWithAI(): void {
    // Placeholder for AI-assisted task generation.
    console.log('AI task generation placeholder');
  }

  getControl(controlName: string) {
    return this.taskForm.get(controlName);
  }

  isInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
