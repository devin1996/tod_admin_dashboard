import { Routes } from '@angular/router';

export const promotionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/promotions-list.component').then(m => m.PromotionsListComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/promotions-form.component').then(m => m.PromotionsFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/promotions-form.component').then(m => m.PromotionsFormComponent),
  },
];
