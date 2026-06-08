import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-passenger-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './passenger-sidebar.component.html',
  styleUrl: './passenger-sidebar.component.scss',
})
export class PassengerSidebarComponent {
  navItems: NavItem[] = [
    { label: 'Home',       icon: 'home',          route: '/home' },
  ];
}
