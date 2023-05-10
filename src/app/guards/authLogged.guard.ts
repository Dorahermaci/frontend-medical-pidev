import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogged implements CanActivate {

  constructor(private userservice: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is logged in
    if (this.userservice.isLoggedIn()) {
        this.router.navigate(['/home']);
        return true;
      // Allow access to the route
    } else {
      // Redirect to the login page or any other page you prefer
      this.router.navigate(['/login']);
      return false; // Block access to the route
    }
  }
}
