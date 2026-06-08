import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PublicApiService } from '../../../core/services/public-api.service';

@Component({
  selector: 'app-public-promotions',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './public-promotions.component.html',
  styleUrl: './public-promotions.component.scss',
})
export class PublicPromotionsComponent implements OnInit {
  rows = signal<any[]>([]);
  loading = signal(true);

  constructor(private api: PublicApiService) {}

  ngOnInit() {
    this.api.getPromotions().subscribe({
      next: data => {
        this.rows.set(
          Object.values(data ?? {}).filter((p: any) => p.active)
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
