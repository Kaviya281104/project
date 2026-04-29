import { Injectable, signal } from '@angular/core';

export interface Task {
  id: string;
  applicationCategory: string;
  type: string;
  lead: string;
  story: string;
  task: string;
  description: string;
  assignedBy: string;
  assignedTo: string;
  assignedJiraId: string;
  environment: string;
  status: string;
  startDate: string;
  endDate: string;
  estimatedHours: number;
  estimatedWorkingHours: number;
  comments: string;
  milestones: string;
  estimatedCompletionDate: string;
  changeRequestNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasks = signal<Task[]>([
    {
      id: '1',
      applicationCategory: 'AD',
      type: 'Enhancement',
      lead: 'Alice Morgan',
      story: 'Improve search performance for large datasets',
      task: 'Optimize search index update',
      description: 'Refactor the search indexing pipeline to reduce query latency and improve throughput.',
      assignedBy: 'Brian Clark',
      assignedTo: 'Emma Lewis',
      assignedJiraId: 'JIRA-1054',
      environment: 'Production',
      status: 'In Progress',
      startDate: '2026-04-10',
      endDate: '2026-04-18',
      estimatedHours: 24,
      estimatedWorkingHours: 20,
      comments: 'Need to validate across regions before deployment.',
      milestones: 'Search Index v2 launch',
      estimatedCompletionDate: '2026-04-19',
      changeRequestNumber: 'CR-2123',
    },
    {
      id: '2',
      applicationCategory: 'AMS',
      type: 'Analyse',
      lead: 'Carlos Vega',
      story: 'Investigate memory growth in the reporting process',
      task: 'Memory leak analysis for report generation',
      description: 'Trace memory allocation and remove redundant caches.',
      assignedBy: 'Dana Scott',
      assignedTo: 'Joel Kim',
      assignedJiraId: 'JIRA-1080',
      environment: 'Staging',
      status: 'Open',
      startDate: '2026-04-15',
      endDate: '2026-04-22',
      estimatedHours: 18,
      estimatedWorkingHours: 16,
      comments: 'Could be related to third-party CSV parser.',
      milestones: 'Staging validation',
      estimatedCompletionDate: '2026-04-23',
      changeRequestNumber: 'CR-2150',
    },
  ]);

  readonly tasksList = this.tasks.asReadonly();

  getTasks(): Task[] {
    return this.tasks();
  }

  createTask(task: Omit<Task, 'id'>): Task {
    const nextId = String(this.tasks().length + 1);
    const newTask: Task = {
      id: nextId,
      ...task,
    };
    this.tasks.update(list => [...list, newTask]);
    return newTask;
  }
}
