import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardTech implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if (currentUser && currentUser.user.appUserRole === 'TECHNICIAN') {
      // user is authenticated and has an admin role, so allow access
      return true;
    }
    // user is not authenticated or doesn't have an admin role, so redirect to login page
    this.router.navigate(['/**'], {
      skipLocationChange: true,
    });
    return false;
  }
}
