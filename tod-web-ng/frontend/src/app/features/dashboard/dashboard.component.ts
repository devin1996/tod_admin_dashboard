import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cards = [
    { label: 'Bus Routes',  icon: 'route',          route: '/bus-routes',  color: '#3f51b5' },
    { label: 'Time Slots',  icon: 'schedule',        route: '/timeslots',   color: '#009688' },
    { label: 'Buses',       icon: 'directions_bus',  route: '/buses',       color: '#ff5722' },
    { label: 'Drivers',     icon: 'person',          route: '/drivers',     color: '#9c27b0' },
    { label: 'Conductors',  icon: 'badge',           route: '/conductors',  color: '#2196f3' },
    { label: 'Passengers',  icon: 'group',           route: '/passengers',  color: '#4caf50' },
    { label: 'Reviews',     icon: 'star',            route: '/reviews',     color: '#ff9800' },
    { label: 'Promotions',  icon: 'local_offer',     route: '/promotions',  color: '#e91e63' },
    { label: 'Companies',   icon: 'business',        route: '/companies',   color: '#607d8b' },
  ];
}
