import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8092/Register';
  constructor(private http: HttpClient) { }
  getAllRegisters(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.apiUrl}/getAllRegisters`);
  }

  updateRegister(id: number, register: Register): Observable<Register> {
    return this.http.put<Register>(`${this.apiUrl}/updateRegister/${id}`, register);
  }

  deleteRegister(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteRegister/${id}`);
  }
  getRegisterById(id: number): Observable<Register> {
    const url = `${this.apiUrl}/GetRegisterById/${id}`;
    return this.http.get<Register>(url);
  }

  getRegistersByAppUserId(appUserId: number): Observable<Register[]> {
    const url = `${this.apiUrl}/GetRegisterByUserId/${appUserId}`;
    return this.http.get<Register[]>(url);
  }

  isUserRegistered(courseId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isUserRegistered/courses/${courseId}/users/${userId}/registered`);
  }

  joinCourse(courseId: number, appUserId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/joinCourse/${courseId}/?appUserId=${appUserId}`, {});
  }

  getSuccessRateForCourse(courseId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/Statistics/successRate/${courseId}`);
  }

  calculateScore(appUserId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/calculateScore/${appUserId}`, {});

  }

  countRegisteredUsersForCourse(courseId: number){
    return this.http.get(`${this.apiUrl}/${courseId}/registered-users/count`);
  }

  countSucceededUsersInCourse(courseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${courseId}/succeeded-users/count`);
  }

  countFailedUsersInCourse(courseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${courseId}/failed-users/count`);
  }
  updateRegistrationStatus(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/registrations/${id}?status=${status}`;
    return this.http.put(url, null, { observe: 'response' });
  }
 /* getRankedAppUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.baseUrl}/app-users/ranked`);
  }*/
}
