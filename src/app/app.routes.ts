import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'task-1',
        pathMatch: 'full',
      },
      {
        path: 'task-1',
        loadComponent: () =>
          import('./pages/task-1/task-1.component').then(
            (r) => r.Task1Component
          ),
      },
      {
        path: 'task-2',
        loadComponent: () =>
          import('./pages/task-2/task-2.component').then(
            (r) => r.Task2Component
          ),
      },
      {
        path: 'task-3',
        loadComponent: () =>
          import('./pages/task-3/task-3.component').then(
            (r) => r.Task3Component
          ),
      },
      {
        path: 'task-4',
        loadComponent: () =>
          import('./pages/task-4/task-4.component').then(
            (r) => r.Task4Component
          ),
      },
      {
        path: 'task-5',
        loadComponent: () =>
          import('./pages/task-5/task-5.component').then(
            (r) => r.Task5Component
          ),
      },
    ],
  },
];
