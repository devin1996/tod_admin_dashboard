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
import { DriversService, Driver } from '../../../core/services/drivers.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatTooltipModule],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.scss',
})
export class DriversListComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'licenseNo', 'phone', 'companyId', 'actions'];
  rows = signal<(Driver & { _key: string })[]>([]);
  loading = signal(true);

  constructor(private svc: DriversService, private snack: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: data => {
        this.rows.set(Object.entries(data ?? {}).map(([_key, v]) => ({ ...v, _key })));
        this.loading.set(false);
      },
      error: () => { this.snack.open('Failed to load drivers', 'Close', { duration: 3000 }); this.loading.set(false); },
    });
  }

  confirmDelete(row: Driver & { _key: string }) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: `Delete driver "${row.firstName} ${row.lastName}"?` } })
      .afterClosed().subscribe(ok => {
        if (!ok) return;
        this.svc.delete(row._key).subscribe({
          next: () => { this.snack.open('Driver deleted', 'Close', { duration: 2500 }); this.load(); },
          error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 }),
        });
      });
  }
}
