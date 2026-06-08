import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicApiService {
  private readonly base = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getBusRoutes(): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`${this.base}/bus-routes`);
  }

  getSchedules(): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`${this.base}/timeslots`);
  }

  getPromotions(): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`${this.base}/promotions`);
  }
}
