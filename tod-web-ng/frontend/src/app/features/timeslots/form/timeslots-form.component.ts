import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TimeSlotsService } from '../../../core/services/timeslots.service';

@Component({
  selector: 'app-timeslots-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './timeslots-form.component.html',
  styleUrl: './timeslots-form.component.scss',
})
export class TimeSlotsFormComponent implements OnInit {
  form!: FormGroup;
  editId = signal<string | null>(null);
  loading = signal(false);
  saving = signal(false);

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private svc: TimeSlotsService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      slotName:  ['', Validators.required],
      startTime: ['', Validators.required],
      endTime:   ['', Validators.required],
      routeId:   ['', Validators.required],
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      this.loading.set(true);
      this.svc.getAll().subscribe({ next: data => { const item = (data as any)[id]; if (item) this.form.patchValue(item); this.loading.set(false); }, error: () => this.loading.set(false) });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    const id = this.editId();
    (id ? this.svc.update(id, this.form.value) : this.svc.create(this.form.value)).subscribe({
      next: () => { this.snack.open(id ? 'Slot updated' : 'Slot created', 'Close', { duration: 2500 }); this.router.navigate(['/timeslots']); },
      error: () => { this.snack.open('Save failed', 'Close', { duration: 3000 }); this.saving.set(false); },
    });
  }
}
