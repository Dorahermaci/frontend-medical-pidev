import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-account-icon',
  templateUrl: './account-icon.component.html',
  styleUrls: ['./account-icon.component.css']
})
export class AccountIconComponent implements OnInit {
  
  localStorageUser: any; // Define the localStorageUser variable

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve the user object from localStorage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.localStorageUser = currentUser?.user;
    }
  }
  

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
