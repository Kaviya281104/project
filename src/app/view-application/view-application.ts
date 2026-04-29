import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationService, Application } from '../services/application.service';

@Component({
  selector: 'app-view-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-application.html',
  styleUrl: './view-application.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewApplication {
  showDeleteConfirm = signal<string | null>(null);

  constructor(
    public applicationService: ApplicationService,
    private router: Router
  ) {}

  onNewApplication(): void {
    this.router.navigate(['/create-application']);
  }

  onEdit(application: Application): void {
    this.router.navigate(['/create-application'], {
      queryParams: { id: application.id },
    });
  }

  onDeleteClick(id: string): void {
    this.showDeleteConfirm.set(id);
  }

  onConfirmDelete(id: string): void {
    this.applicationService.deleteApplication(id);
    this.showDeleteConfirm.set(null);
  }

  onCancelDelete(): void {
    this.showDeleteConfirm.set(null);
  }
}
