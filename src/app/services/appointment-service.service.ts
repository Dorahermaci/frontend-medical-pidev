import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private baseUrl = '/api';
  private token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXRpZW50LnBhdGllbnRAZXNwcml0LnRuIiwiZXhwIjoxNjgyODE4MTIzLCJpYXQiOjE2ODI4MDAxMjN9.BUoSIvl8xSe0ajCYEsHWZQe70l6qpmxw4IpyMGURV-udo0I8UVf99Yce1AR9in-DR31x1ji6ocy9NkpTN3LltQ"



  constructor(private http: HttpClient) { }




  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<[]>(`${this.baseUrl}/appointments`);
  }

  getAppointmentsByUserId(id:any): Observable<Appointment[]> {
    return this.http.get<[]>(`${this.baseUrl}/appointments/patient/${id}`);
  }

  deleteAppointmentById(id: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<void>(`http://localhost:8091/appointments/${id}`, {headers});
  }

}
