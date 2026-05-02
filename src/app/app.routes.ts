import { Routes } from '@angular/router';
 
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { EmployeeComponent } from './employee/employee';
import { EmployeeDashboard } from './employee-dashboard/employee-dashboard';
import { ApplicationComponent } from './application/application';
import { CreateApplicationComponent } from './create-application/create-application';
import { ViewApplication } from './view-application/view-application';
import { TaskComponent } from './task/task';
import { CreateTaskComponent } from './create-task/create-task';
import { ViewTaskComponent } from './view-task/view-task';
import { ReportComponent } from './report/report';
import { ResetPassword } from './pages/reset-password/reset-password';
//import { ApplicationsComponent } from './pages/applications/applications';
//import { TasksComponent } from './pages/tasks/tasks';
 
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
 { path: 'employee-dashboard',component :EmployeeDashboard},
  { path: 'employee', component: EmployeeComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'create-application', component: CreateApplicationComponent },
  { path: 'view-application', component: ViewApplication },
  { path: 'task', component: TaskComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'view-tasks', component: ViewTaskComponent },
  //{ path: 'tasks', component: TasksComponent },
  { path: 'report', component: ReportComponent },
  { path: 'reset-password', component: ResetPassword },
];
 
 
 