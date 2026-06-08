import { Routes } from '@angular/router';

export const companiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/companies-list.component').then(m => m.CompaniesListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/companies-form.component').then(m => m.CompaniesFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/companies-form.component').then(m => m.CompaniesFormComponent),
  },
];
