import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbarback',
  templateUrl: './navbarback.component.html',
  styleUrls: ['./navbarback.component.css']
})
export class NavbarbackComponent {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

}
