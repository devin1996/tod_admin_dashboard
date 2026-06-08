import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PublicApiService } from '../../../core/services/public-api.service';

@Component({
  selector: 'app-public-bus-routes',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatChipsModule,
    MatProgressBarModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './public-bus-routes.component.html',
  styleUrl: './public-bus-routes.component.scss',
})
export class PublicBusRoutesComponent implements OnInit {
  displayedColumns = ['routeNo', 'routeName', 'busType', 'totalDistance', 'avgTime'];
  allRows: any[] = [];
  rows = signal<any[]>([]);
  loading = signal(true);
  search = '';

  constructor(private api: PublicApiService) {}

  ngOnInit() {
    this.api.getBusRoutes().subscribe({
      next: data => {
        this.allRows = Object.values(data ?? {});
        this.rows.set(this.allRows);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  filter() {
    const q = this.search.toLowerCase();
    this.rows.set(
      this.allRows.filter(r =>
        r.routeName?.toLowerCase().includes(q) ||
        r.routeNo?.toLowerCase().includes(q)
      )
    );
  }
}
