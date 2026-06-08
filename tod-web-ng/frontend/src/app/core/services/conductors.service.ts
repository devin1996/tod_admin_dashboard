import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Conductor {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyId: string;
}

@Injectable({ providedIn: 'root' })
export class ConductorsService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, Conductor>> {
    return this.api.get('conductors');
  }

  create(data: Conductor): Observable<Conductor> {
    return this.api.post('conductors', data);
  }

  update(id: string, data: Partial<Conductor>): Observable<Conductor> {
    return this.api.put(`conductors/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`conductors/${id}`);
  }
}
