import { Routes } from '@angular/router';

export const busesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/buses-list.component').then(m => m.BusesListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/buses-form.component').then(m => m.BusesFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/buses-form.component').then(m => m.BusesFormComponent),
  },
];
