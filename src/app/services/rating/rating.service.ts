import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:8092/';

  constructor(private http: HttpClient) { }

  createRating(rating: Rating, courseId: number): Observable<any> {
    const url = this.baseUrl + `createRating/${courseId}/`;
    return this.http.post(url, rating);
  }
}
