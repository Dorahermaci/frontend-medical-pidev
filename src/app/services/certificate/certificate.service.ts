import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../../models/certificate';
@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl = 'http://localhost:8092/Certificate';
  constructor(private http: HttpClient) { }

  addCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(`${this.apiUrl}/createCertificate`, certificate);
  }

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.apiUrl}/getAllCertificates`);
  }

  getCertificateById(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.apiUrl}/getCertificateById/${id}`);
  }

  updateCertificate(id: number, certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(`${this.apiUrl}/Updatecertificate/${id}`, certificate);
  }

  deleteCertificate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCertificate/${id}`, { responseType: 'text' });
  }

  assignCertificateToAppUser(certificateId: number, appUserId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${certificateId}/assign-to/${appUserId}`, null, { responseType: 'text' });
  }

  assignCertificateToTrainingCourse(certificateId: number, courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/assignCertificateToTrainingCourse/${certificateId}/assignToCourse/${courseId}`, null, { responseType: 'text' });
  }

  exportCertificate(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/exportContrat/export/${id}`, { responseType: 'blob' });
  }
}
