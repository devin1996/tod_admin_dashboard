import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BusRoutesService } from '../../../core/services/bus-routes.service';

@Component({
  selector: 'app-bus-routes-form',
  standalone: true,
  imports: [
    RouterLink, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatSnackBarModule,
  ],
  templateUrl: './bus-routes-form.component.html',
  styleUrl: './bus-routes-form.component.scss',
})
export class BusRoutesFormComponent implements OnInit {
  form!: FormGroup;
  editId = signal<string | null>(null);
  loading = signal(false);
  saving = signal(false);

  busTypes = ['AC', 'Non-AC', 'Semi-Luxury', 'Luxury'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: BusRoutesService,
    private snack: MatSnackBar,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      routeRegNo:    ['', Validators.required],
      routeNo:       ['', Validators.required],
      routeName:     ['', Validators.required],
      totalDistance: ['', Validators.required],
      avgSpeed:      ['', Validators.required],
      avgTime:       ['', Validators.required],
      efectiveDate:  ['', Validators.required],
      busType:       ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      this.loading.set(true);
      this.svc.getAll().subscribe({
        next: data => {
          const item = (data as any)[id];
          if (item) this.form.patchValue(item);
          this.loading.set(false);
        },
        error: () => {
          this.snack.open('Failed to load route', 'Close', { duration: 3000 });
          this.loading.set(false);
        },
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    const id = this.editId();
    const op = id
      ? this.svc.update(id, this.form.value)
      : this.svc.create(this.form.value);

    op.subscribe({
      next: () => {
        this.snack.open(id ? 'Route updated' : 'Route created', 'Close', { duration: 2500 });
        this.router.navigate(['/bus-routes']);
      },
      error: () => {
        this.snack.open('Save failed', 'Close', { duration: 3000 });
        this.saving.set(false);
      },
    });
  }
}
