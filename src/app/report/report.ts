import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-report',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './report.html',
  standalone: true,
  styleUrls: ['./report.css'],
})
export class ReportComponent {
  reports: Array<{ taskId: string; hours: number; comments: string }> = [];
  activeFilter: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom' = 'daily';
  isCustomSelected = false;
  customStartDate = '';
  customEndDate = '';
  customDateError = '';
  insight = 'Click AI for report insights.';
  currentPeriodLabel = 'Daily';
  reportRangeText = '';
 
  constructor() {
    this.fetchReport('daily');
  }
 
  selectFilter(filter: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'): void {
    this.activeFilter = filter;
    this.isCustomSelected = filter === 'custom';
    this.customDateError = '';
    this.insight = 'Click AI for report insights.';
 
    if (this.isCustomSelected) {
      this.currentPeriodLabel = 'Custom';
      this.reportRangeText = '';
      this.reports = [];
      return;
    }
 
    this.fetchReport(filter);
  }
 
  applyCustom(): void {
    this.customDateError = '';
 
    if (!this.customStartDate || !this.customEndDate) {
      this.customDateError = 'Please select both start date and end date.';
      this.reports = [];
      return;
    }
 
    if (this.customStartDate > this.customEndDate) {
      this.customDateError = 'Start Date cannot be later than End Date.';
      this.reports = [];
      return;
    }
 
    this.reportRangeText = `(${this.customStartDate} to ${this.customEndDate})`;
    this.fetchReport('custom', this.customStartDate, this.customEndDate);
  }
 
  showInsights(): void {
    if (this.reports.length === 0) {
      this.insight = 'No report data yet. Load a range or apply custom dates first.';
      return;
    }
 
    const totalHours = this.reports.reduce((sum, item) => sum + item.hours, 0);
    if (totalHours >= 40) {
      this.insight = 'Insight: High workload this period. Consider balancing tasks or updating estimates.';
    } else if (totalHours >= 20) {
      this.insight = 'Insight: Moderate work load. Keep tracking progress.';
    } else {
      this.insight = 'Insight: Light workload. Opportunity to add or review tasks.';
    }
  }
 
  private fetchReport(period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom', startDate?: string, endDate?: string): void {
    this.currentPeriodLabel = period.charAt(0).toUpperCase() + period.slice(1);
    this.reportRangeText = '';
 
    switch (period) {
      case 'daily':
        this.reports = [
          { taskId: 'Daily-101', hours: 4, comments: 'Daily summary completed' },
        ];
        break;
      case 'weekly':
        this.reports = [
          { taskId: 'Weekly-201', hours: 12, comments: 'Weekly sprint planning' },
          { taskId: 'Weekly-202', hours: 15, comments: 'Weekly development work' },
        ];
        break;
      case 'monthly':
        this.reports = [
          { taskId: 'Monthly-301', hours: 40, comments: 'Monthly feature delivery' },
          { taskId: 'Monthly-302', hours: 25, comments: 'Monthly UI updates' },
        ];
        break;
      case 'yearly':
        this.reports = [
          { taskId: 'Yearly-401', hours: 120, comments: 'Yearly roadmap progress' },
          { taskId: 'Yearly-402', hours: 90, comments: 'Yearly release planning' },
        ];
        break;
      case 'custom':
        this.reports = [
          { taskId: `Custom-${startDate}`, hours: 18, comments: `Custom report from ${startDate} to ${endDate}` },
          { taskId: `Custom-${endDate}`, hours: 22, comments: `Custom totals for selected range` },
        ];
        break;
    }
  }
}
 
 