import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  fetchClaims(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8091/claims');
  }

  updateClaim(id: number, claim: any): Observable<any> {
    return this.http.put(`http://localhost:8091/claims/${id}`, claim);
  }

  deleteClaim(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8091/claims/${id}`);
  }
  getClaimById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8091/claims/${id}`);
  }
  
}
