import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface TimeSlot {
  id?: string;
  slotName: string;
  startTime: string;
  endTime: string;
  routeId: string;
}

@Injectable({ providedIn: 'root' })
export class TimeSlotsService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, TimeSlot>> {
    return this.api.get('timeslots');
  }

  create(data: TimeSlot): Observable<TimeSlot> {
    return this.api.post('timeslots', data);
  }

  update(id: string, data: Partial<TimeSlot>): Observable<TimeSlot> {
    return this.api.put(`timeslots/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`timeslots/${id}`);
  }
}
