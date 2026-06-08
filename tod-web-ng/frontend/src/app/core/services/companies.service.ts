import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Company {
  id?: string;
  companyName: string;
  regNo: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Record<string, Company>> {
    return this.api.get('companies');
  }

  create(data: Company): Observable<Company> {
    return this.api.post('companies', data);
  }

  update(id: string, data: Partial<Company>): Observable<Company> {
    return this.api.put(`companies/${id}`, data);
  }

  delete(id: string): Observable<unknown> {
    return this.api.delete(`companies/${id}`);
  }
}
