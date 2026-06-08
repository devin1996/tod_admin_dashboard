import { Routes } from '@angular/router';

export const timeslotsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/timeslots-list.component').then(m => m.TimeSlotsListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/timeslots-form.component').then(m => m.TimeSlotsFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/timeslots-form.component').then(m => m.TimeSlotsFormComponent),
  },
];
