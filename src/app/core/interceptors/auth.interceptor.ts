import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the user is logged in and has a token
    const token = localStorage.getItem('token');
    if (token) {
      // Clone the request and add the bearer token header
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      // Pass the new request to the next interceptor in the chain
      return next.handle(newRequest);
    } else {
      // If the user is not logged in or has no token, just pass the request along
      return next.handle(request);
    }
  }
}