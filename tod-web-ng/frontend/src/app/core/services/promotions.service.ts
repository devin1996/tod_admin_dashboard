import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Promotion {
  id?: string;
  title: string;
  description: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class PromotionsService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, Promotion>> {
    return this.api.get('promotions');
  }

  create(data: Promotion): Observable<Promotion> {
    return this.api.post('promotions', data);
  }

  update(id: string, data: Partial<Promotion>): Observable<Promotion> {
    return this.api.put(`promotions/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`promotions/${id}`);
  }
}
