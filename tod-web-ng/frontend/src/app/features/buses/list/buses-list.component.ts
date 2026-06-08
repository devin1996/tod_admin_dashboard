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
import { BusesService, Bus } from '../../../core/services/buses.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-buses-list',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatChipsModule, MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatTooltipModule],
  templateUrl: './buses-list.component.html',
  styleUrl: './buses-list.component.scss',
})
export class BusesListComponent implements OnInit {
  displayedColumns = ['busRegNo', 'busType', 'capacity', 'companyId', 'routeId', 'actions'];
  rows = signal<(Bus & { _key: string })[]>([]);
  loading = signal(true);

  constructor(private svc: BusesService, private snack: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: data => {
        this.rows.set(Object.entries(data ?? {}).map(([_key, v]) => ({ ...v, _key })));
        this.loading.set(false);
      },
      error: () => { this.snack.open('Failed to load buses', 'Close', { duration: 3000 }); this.loading.set(false); },
    });
  }

  confirmDelete(row: Bus & { _key: string }) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: `Delete bus "${row.busRegNo}"?` } })
      .afterClosed().subscribe(ok => {
        if (!ok) return;
        this.svc.delete(row._key).subscribe({
          next: () => { this.snack.open('Bus deleted', 'Close', { duration: 2500 }); this.load(); },
          error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 }),
        });
      });
  }
}
