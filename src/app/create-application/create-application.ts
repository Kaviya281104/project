import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-application.html',
  styleUrl: './create-application.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateApplicationComponent implements OnInit {
  applicationForm!: FormGroup;
  isEditMode = false;
  editingId: string | null = null;
  submitted = false;

  subgroupOptions = ['Sales', 'Operations', 'Human Resources', 'Finance', 'IT', 'Marketing'];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.editingId = id;
        this.loadApplicationData(id);
      }
    });
  }

  private initializeForm(): void {
    this.applicationForm = this.fb.group({
      applicationName: ['', [Validators.required, Validators.minLength(3)]],
      gearId: ['', [Validators.required, Validators.minLength(3)]],
      subgroup: ['', Validators.required],
      owner: ['', [Validators.required, Validators.minLength(2)]],
      lead: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  private loadApplicationData(id: string): void {
    const application = this.applicationService.getApplicationById(id);
    if (application) {
      this.applicationForm.patchValue({
        applicationName: application.applicationName,
        gearId: application.gearId,
        subgroup: application.subgroup,
        owner: application.owner,
        lead: application.lead,
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.applicationForm.valid) {
      const formValue = this.applicationForm.value;

      if (this.isEditMode && this.editingId) {
        this.applicationService.updateApplication(this.editingId, formValue);
      } else {
        this.applicationService.createApplication(formValue);
      }

      this.router.navigate(['/view-application']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/application']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.applicationForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.getError('minlength')?.requiredLength;
      return `${fieldName} must be at least ${minLength} characters`;
    }
    return '';
  }
}
