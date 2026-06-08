import { Routes } from '@angular/router';

export const conductorsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/conductors-list.component').then(m => m.ConductorsListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/conductors-form.component').then(m => m.ConductorsFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/conductors-form.component').then(m => m.ConductorsFormComponent),
  },
];
