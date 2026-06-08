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
import { ConductorsService, Conductor } from '../../../core/services/conductors.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-conductors-list',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatProgressBarModule, MatSnackBarModule, MatDialogModule, MatTooltipModule],
  templateUrl: './conductors-list.component.html',
  styleUrl: './conductors-list.component.scss',
})
export class ConductorsListComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'phone', 'companyId', 'actions'];
  rows = signal<(Conductor & { _key: string })[]>([]);
  loading = signal(true);

  constructor(private svc: ConductorsService, private snack: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: data => {
        this.rows.set(Object.entries(data ?? {}).map(([_key, v]) => ({ ...v, _key })));
        this.loading.set(false);
      },
      error: () => { this.snack.open('Failed to load conductors', 'Close', { duration: 3000 }); this.loading.set(false); },
    });
  }

  confirmDelete(row: Conductor & { _key: string }) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: `Delete conductor "${row.firstName} ${row.lastName}"?` } })
      .afterClosed().subscribe(ok => {
        if (!ok) return;
        this.svc.delete(row._key).subscribe({
          next: () => { this.snack.open('Conductor deleted', 'Close', { duration: 2500 }); this.load(); },
          error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 }),
        });
      });
  }
}
