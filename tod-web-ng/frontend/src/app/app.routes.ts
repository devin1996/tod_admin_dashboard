import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ── Public login page (admin-only, reached via the header button) ──
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },

  // ── Passenger-facing public shell (no login required) ──
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/public-shell/public-shell.component').then(m => m.PublicShellComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/public/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'bus-routes-public',
        loadComponent: () =>
          import('./features/public/bus-routes/public-bus-routes.component').then(m => m.PublicBusRoutesComponent),
      },
      {
        path: 'schedules',
        loadComponent: () =>
          import('./features/public/schedules/public-schedules.component').then(m => m.PublicSchedulesComponent),
      },
      {
        path: 'promotions-public',
        loadComponent: () =>
          import('./features/public/promotions/public-promotions.component').then(m => m.PublicPromotionsComponent),
      },
    ],
  },

  // ── Admin shell (login required) ──
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'bus-routes',
        loadChildren: () =>
          import('./features/bus-routes/bus-routes.routes').then(m => m.busRoutesRoutes),
      },
      {
        path: 'timeslots',
        loadChildren: () =>
          import('./features/timeslots/timeslots.routes').then(m => m.timeslotsRoutes),
      },
      {
        path: 'buses',
        loadChildren: () =>
          import('./features/buses/buses.routes').then(m => m.busesRoutes),
      },
      {
        path: 'drivers',
        loadChildren: () =>
          import('./features/drivers/drivers.routes').then(m => m.driversRoutes),
      },
      {
        path: 'conductors',
        loadChildren: () =>
          import('./features/conductors/conductors.routes').then(m => m.conductorsRoutes),
      },
      {
        path: 'passengers',
        loadComponent: () =>
          import('./features/passengers/passengers.component').then(m => m.PassengersComponent),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./features/reviews/reviews.component').then(m => m.ReviewsComponent),
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('./features/promotions/promotions.routes').then(m => m.promotionsRoutes),
      },
      {
        path: 'companies',
        loadChildren: () =>
          import('./features/companies/companies.routes').then(m => m.companiesRoutes),
      },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
