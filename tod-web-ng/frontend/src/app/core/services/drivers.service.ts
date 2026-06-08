import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Driver {
  id?: string;
  firstName: string;
  lastName: string;
  licenseNo: string;
  phone: string;
  companyId: string;
}

@Injectable({ providedIn: 'root' })
export class DriversService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, Driver>> {
    return this.api.get('drivers');
  }

  create(data: Driver): Observable<Driver> {
    return this.api.post('drivers', data);
  }

  update(id: string, data: Partial<Driver>): Observable<Driver> {
    return this.api.put(`drivers/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`drivers/${id}`);
  }
}
