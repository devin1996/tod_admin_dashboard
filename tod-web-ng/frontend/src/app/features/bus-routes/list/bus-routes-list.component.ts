import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BusRoutesService, BusRoute } from '../../../core/services/bus-routes.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bus-routes-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatChipsModule, MatProgressBarModule, MatSnackBarModule,
    MatDialogModule, MatTooltipModule,
  ],
  templateUrl: './bus-routes-list.component.html',
  styleUrl: './bus-routes-list.component.scss',
})
export class BusRoutesListComponent implements OnInit {
  displayedColumns = ['routeNo', 'routeName', 'busType', 'totalDistance', 'avgSpeed', 'avgTime', 'efectiveDate', 'actions'];
  rows = signal<(BusRoute & { _key: string })[]>([]);
  loading = signal(true);

  constructor(
    private svc: BusRoutesService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: data => {
        this.rows.set(
          Object.entries(data ?? {}).map(([_key, v]) => ({ ...v, _key }))
        );
        this.loading.set(false);
      },
      error: () => {
        this.snack.open('Failed to load bus routes', 'Close', { duration: 3000 });
        this.loading.set(false);
      },
    });
  }

  confirmDelete(row: BusRoute & { _key: string }) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete route "${row.routeName}"?` },
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.svc.delete(row._key).subscribe({
        next: () => {
          this.snack.open('Route deleted', 'Close', { duration: 2500 });
          this.load();
        },
        error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 }),
      });
    });
  }
}
