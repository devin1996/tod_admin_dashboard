import { Routes } from '@angular/router';

export const driversRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/drivers-list.component').then(m => m.DriversListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/drivers-form.component').then(m => m.DriversFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/drivers-form.component').then(m => m.DriversFormComponent),
  },
];
