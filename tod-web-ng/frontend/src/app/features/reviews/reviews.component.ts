import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <h2>Reviews</h2>
    <mat-card><mat-card-content><p>Reviews management coming soon…</p></mat-card-content></mat-card>
  `,
})
export class ReviewsComponent {}
