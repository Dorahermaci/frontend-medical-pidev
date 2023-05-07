import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingCourse } from '../../models/training-course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private apiUrl = 'http://localhost:8092/TrainingCourse';
  constructor(private http: HttpClient) { }

  addTrainingCourse(trainingCourse: TrainingCourse): Observable<TrainingCourse> {
    return this.http.post<TrainingCourse>(`${this.apiUrl}/addTrainingCourse`, trainingCourse);
  }

  updateTrainingCourse(trainingCourse: TrainingCourse): Observable<TrainingCourse> {
    return this.http.put<TrainingCourse>(`${this.apiUrl}/updateTrainingCourse`, trainingCourse);
  }

  deleteTrainingCourse(idCourse: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteTrainingCourse/${idCourse}`);
  }

  getAllTrainingCourses(): Observable<TrainingCourse[]> {
    return this.http.get<TrainingCourse[]>(`${this.apiUrl}/getAllTrainingCourses/`);
  }

  getTrainingCourseById(idCourse: number): Observable<TrainingCourse> {
    return this.http.get<TrainingCourse>(`${this.apiUrl}/getTrainingCourseById/${idCourse}`);
  }
  addLikeToCourse(courseId: number) {
    return this.http.post<TrainingCourse>(`${this.apiUrl}/DISLIKE/1/like/LIKE/${courseId}/like`, {});
}

addDislikeToCourse(courseId: number) {
  return this.http.post<TrainingCourse>(`${this.apiUrl}/DISLIKE/1/like/DISLIKE/${courseId}/dislike`, {});
  }

  getSuccessRateForCourse(courseId: number) {
    return this.http.get<string>(`http://localhost:8092/Statistics/successRate/${courseId}`);
  }
  openMeetingLink() {
    const url = `${this.apiUrl}/openMeetingLink`;
    return this.http.get(url);
  }
}



  

 

