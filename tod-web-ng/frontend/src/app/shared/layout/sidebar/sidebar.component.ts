import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard',    icon: 'dashboard',        route: '/dashboard' },
    { label: 'Bus Routes',   icon: 'route',            route: '/bus-routes' },
    { label: 'Time Slots',   icon: 'schedule',         route: '/timeslots' },
    { label: 'Buses',        icon: 'directions_bus',   route: '/buses' },
    { label: 'Drivers',      icon: 'person',           route: '/drivers' },
    { label: 'Conductors',   icon: 'badge',            route: '/conductors' },
    { label: 'Passengers',   icon: 'group',            route: '/passengers' },
    { label: 'Reviews',      icon: 'star',             route: '/reviews' },
    { label: 'Promotions',   icon: 'local_offer',      route: '/promotions' },
    { label: 'Companies',    icon: 'business',         route: '/companies' },
  ];
}
