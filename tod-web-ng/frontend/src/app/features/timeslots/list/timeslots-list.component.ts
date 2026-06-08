import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimeSlotsService, TimeSlot } from '../../../core/services/timeslots.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-timeslots-list',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatTooltipModule],
  templateUrl: './timeslots-list.component.html',
  styleUrl: './timeslots-list.component.scss',
})
export class TimeSlotsListComponent implements OnInit {
  displayedColumns = ['slotName', 'startTime', 'endTime', 'routeId', 'actions'];
  rows = signal<(TimeSlot & { _key: string })[]>([]);
  loading = signal(true);

  constructor(private svc: TimeSlotsService, private snack: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: data => {
        this.rows.set(Object.entries(data ?? {}).map(([_key, v]) => ({ ...v, _key })));
        this.loading.set(false);
      },
      error: () => { this.snack.open('Failed to load time slots', 'Close', { duration: 3000 }); this.loading.set(false); },
    });
  }

  confirmDelete(row: TimeSlot & { _key: string }) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: `Delete slot "${row.slotName}"?` } })
      .afterClosed().subscribe(ok => {
        if (!ok) return;
        this.svc.delete(row._key).subscribe({
          next: () => { this.snack.open('Slot deleted', 'Close', { duration: 2500 }); this.load(); },
          error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 }),
        });
      });
  }
}
