import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Bus {
  id?: string;
  busRegNo: string;
  busType: string;
  capacity: number;
  companyId: string;
  routeId: string;
  driverId?: string;
  conductorId?: string;
}

@Injectable({ providedIn: 'root' })
export class BusesService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, Bus>> {
    return this.api.get('buses');
  }

  create(data: Bus): Observable<Bus> {
    return this.api.post('buses', data);
  }

  update(id: string, data: Partial<Bus>): Observable<Bus> {
    return this.api.put(`buses/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`buses/${id}`);
  }
}
