import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PublicApiService } from '../../../core/services/public-api.service';

@Component({
  selector: 'app-public-schedules',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatProgressBarModule,
    MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './public-schedules.component.html',
  styleUrl: './public-schedules.component.scss',
})
export class PublicSchedulesComponent implements OnInit {
  displayedColumns = ['slotName', 'startTime', 'endTime', 'routeId'];
  allRows: any[] = [];
  rows = signal<any[]>([]);
  loading = signal(true);
  search = '';

  constructor(private api: PublicApiService) {}

  ngOnInit() {
    this.api.getSchedules().subscribe({
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
        r.slotName?.toLowerCase().includes(q) ||
        r.routeId?.toLowerCase().includes(q)
      )
    );
  }
}
