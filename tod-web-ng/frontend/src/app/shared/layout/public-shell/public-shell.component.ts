import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PublicTopbarComponent } from '../public-topbar/public-topbar.component';
import { PassengerSidebarComponent } from '../passenger-sidebar/passenger-sidebar.component';

@Component({
  selector: 'app-public-shell',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, PublicTopbarComponent, PassengerSidebarComponent],
  templateUrl: './public-shell.component.html',
  styleUrl: './public-shell.component.scss',
})
export class PublicShellComponent {
  sidenavOpened = true;
}
