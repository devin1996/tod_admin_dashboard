import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface BusRoute {
  id?: string;
  routeRegNo: string;
  routeNo: string;
  routeName: string;
  totalDistance: string;
  avgSpeed: string;
  avgTime: string;
  efectiveDate: string;
  busType: string;
}

@Injectable({ providedIn: 'root' })
export class BusRoutesService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, BusRoute>> {
    return this.api.get('bus-routes');
  }

  create(data: BusRoute): Observable<BusRoute> {
    return this.api.post('bus-routes', data);
  }

  update(id: string, data: Partial<BusRoute>): Observable<BusRoute> {
    return this.api.put(`bus-routes/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`bus-routes/${id}`);
  }
}
