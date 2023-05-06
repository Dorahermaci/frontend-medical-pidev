import {Injectable} from '@angular/core';
import {MedicalFolder} from '../models/medical-folder.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from "../models/appointment";
import {AppointmentDTO} from "../back-office/appointment-back/appointment.dto";

@Injectable({
  providedIn: 'root'
})
export class MedicalFolderService {
  private baseUrl = '/api';
  private token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXRpZW50LnBhdGllbnRAZXNwcml0LnRuIiwiZXhwIjoxNjgyODE4MTIzLCJpYXQiOjE2ODI4MDAxMjN9.BUoSIvl8xSe0ajCYEsHWZQe70l6qpmxw4IpyMGURV-udo0I8UVf99Yce1AR9in-DR31x1ji6ocy9NkpTN3LltQ"


  constructor(private http: HttpClient) {
  }

  getMedicalFolder(id: number): Observable<MedicalFolder> {
    return this.http.get<MedicalFolder>(`${this.baseUrl}/medical-folders/${id}`);
  }

  getAppUsersByRole(role: string): Observable<[]> {
    const url = `${this.baseUrl}/medical-folders/findbyRole?role=${role}`;
    return this.http.get<[]>(url);
  }

  getMedicalFolderById(id: any): Observable<MedicalFolder> {
    return this.http.get<MedicalFolder>(`${this.baseUrl}/medical-folders/${id}`);
  }

  getAllMedicalFolders(): Observable<[]> {
    return this.http.get<[]>(`${this.baseUrl}/medical-folders`);
  }

  createMedicalFolder(medicalFolder: MedicalFolder, files: File[]): Observable<{ id: number }> {

    const formData = new FormData();
    formData.append('medicalFolder', JSON.stringify(medicalFolder));
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    console.log("hiiiii");
    console.log(medicalFolder);

    return this.http.post<{ id: number }>(`http://localhost:8091/medical-folders/`, formData, {headers});
  }

  updateMedicalFolder(id: number, medicalFolder: MedicalFolder, files: File[]): Observable<MedicalFolder> {
    const formData = new FormData();
    formData.append('medicalFolder', JSON.stringify(medicalFolder));
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.put<MedicalFolder>(`${this.baseUrl}/medical-folders/${id}`, formData);
  }
  deleteMedicalFolder(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.baseUrl}/medical-folders/${id}`, {headers});
  }

  createAppointment(appointmentDTO: AppointmentDTO): Observable<AppointmentDTO> {
    return this.http.post<AppointmentDTO>(`${this.baseUrl}/appointments`, appointmentDTO);
  }
}

