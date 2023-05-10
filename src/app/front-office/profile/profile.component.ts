import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AppUser } from 'src/app/core/models/user';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 
 
  showPassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


  selectedTab: string = 'profile';
  oldPassword!: string;
  newPassword!: string;
  user = {
    firstName: '',
    lastName: '',
    phonenumber: ''
  };
  constructor(private userService: UserService , private router:Router) {
    
  }

  updateUser() {
    const currentUserString = localStorage.getItem('currentUser');
  if (!currentUserString) {
    console.error('Current user not found in local storage.');
    return;
  }

  const currentUser = JSON.parse(currentUserString);
  const email = currentUser?.user?.email;
  if (!email) {
    console.error('User email not found.');
    return;
  }
  
    this.userService.updateUser(email, this.user)
      .subscribe(
        updatedUser => {
          Swal.fire({
            icon: 'success',
            title: 'Login Status',
            text: 'Updated succefully',
            timer: 2000,
            timerProgressBar: true,
          });
          console.log('User updated:', updatedUser);
          currentUser.user.firstName = updatedUser.firstName || currentUser?.user?.firstName;
          currentUser.user.lastName = updatedUser.lastName || currentUser?.user?.lastName;
          currentUser.user.phonenumber = updatedUser.phonenumber || currentUser?.user?.phonenumber;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.router.navigateByUrl('/home');

          
        },
        error => {
          
          console.error('Error updating user:', error);
        }
      );
  }

  changePassword(): void {
    const currentUserString = localStorage.getItem('currentUser');
  if (!currentUserString) {
    console.error('Current user not found in local storage.');
    return;
  }

  const currentUser = JSON.parse(currentUserString);
  const email = currentUser?.user?.email;
  if (!email) {
    console.error('User email not found.');
    return;
  }
  
    this.userService.changePassword(email, this.oldPassword, this.newPassword)
      .subscribe(
        () => {
          // Password change successful
          console.log('Password changed successfully');
          // Reset the form or perform any other necessary actions
          this.oldPassword = '';
          this.newPassword = '';
        },
        error => {
          // Handle error
          console.error('Error changing password:', error);
        }
      );
  }
  
  
  
  

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  

 

}
