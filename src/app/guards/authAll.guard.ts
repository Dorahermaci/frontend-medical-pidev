import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAll implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (
      currentUser &&
      (currentUser.user.appUserRole === 'TECHNICIAN' ||
        currentUser.user.appUserRole === 'DOCTOR' ||
        currentUser.user.appUserRole === 'ADMIN')
    ) {
      // User is authenticated and has one of the allowed roles, so allow access
      return true;
    }
  
    // User is not authenticated or doesn't have an allowed role, so redirect to login page
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
  
}
