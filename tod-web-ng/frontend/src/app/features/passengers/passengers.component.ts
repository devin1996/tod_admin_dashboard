import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-passengers',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <h2>Passengers</h2>
    <mat-card><mat-card-content><p>Passenger management coming soon…</p></mat-card-content></mat-card>
  `,
})
export class PassengersComponent {}
