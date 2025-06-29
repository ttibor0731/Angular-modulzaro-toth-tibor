import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent, 
  },
  {
    path: 'tasks',
    component: TasksComponent, 
  },  
];
