import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

export interface Application {
  id: string;
  applicationName: string;
  gearId: string;
  subgroup: string;
  owner: string;
  lead: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly applications = signal<Application[]>([
    {
      id: '1',
      applicationName: 'CRM System',
      gearId: 'GEAR-001',
      subgroup: 'Sales',
      owner: 'John Doe',
      lead: 'Jane Smith',
    },
    {
      id: '2',
      applicationName: 'Inventory Management',
      gearId: 'GEAR-002',
      subgroup: 'Operations',
      owner: 'Mike Johnson',
      lead: 'Sarah Williams',
    },
    {
      id: '3',
      applicationName: 'HR Portal',
      gearId: 'GEAR-003',
      subgroup: 'Human Resources',
      owner: 'Emily Brown',
      lead: 'Robert Davis',
    },
  ]);

  private nextId = 4;

  // Expose applications as read-only signal
  readonly applicationsList = this.applications.asReadonly();

  /**
   * Get all applications
   */
  getApplications(): Application[] {
    return this.applications();
  }

  /**
   * Get application by ID
   */
  getApplicationById(id: string): Application | undefined {
    return this.applications().find(app => app.id === id);
  }

  /**
   * Create new application
   */
  createApplication(application: Omit<Application, 'id'>): Application {
    const newApplication: Application = {
      ...application,
      id: String(this.nextId++),
    };
    this.applications.update(apps => [...apps, newApplication]);
    return newApplication;
  }

  /**
   * Update existing application
   */
  updateApplication(id: string, application: Omit<Application, 'id'>): Application | null {
    const index = this.applications().findIndex(app => app.id === id);
    if (index !== -1) {
      const updatedApplication: Application = { ...application, id };
      const apps = this.applications();
      apps[index] = updatedApplication;
      this.applications.set([...apps]);
      return updatedApplication;
    }
    return null;
  }

  /**
   * Delete application
   */
  deleteApplication(id: string): boolean {
    const initialLength = this.applications().length;
    this.applications.update(apps => apps.filter(app => app.id !== id));
    return this.applications().length < initialLength;
  }
}
