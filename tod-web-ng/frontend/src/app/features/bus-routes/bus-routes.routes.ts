import { Routes } from '@angular/router';

export const busRoutesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/bus-routes-list.component').then(m => m.BusRoutesListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/bus-routes-form.component').then(m => m.BusRoutesFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/bus-routes-form.component').then(m => m.BusRoutesFormComponent),
  },
];
