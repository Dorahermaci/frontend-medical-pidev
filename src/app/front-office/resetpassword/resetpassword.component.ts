import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { PasswordResetRequest } from 'src/app/core/models/passwordresetrequest';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent  {
  email: string = '';
  token: string = '';
  newPassword: string = '';
  isTokenSent: boolean = false;

  constructor(
    private userService: UserService,
    private router:Router
  ) { }

  sendToken() {
    // Call the API to send the token to the entered email
    this.userService.generatePasswordResetToken(this.email).subscribe(
      () => {
        this.isTokenSent = true;

      },
      (error) => {
        this.isTokenSent = true;
      }
    );
  }
  

  resetPassword() {
    const request: PasswordResetRequest = {
      token: this.token,
      newPassword: this.newPassword
    };
  
    this.userService.resetPassword(request).subscribe(
      () => {
        console.log("Password reset successfully."); // Optional: Log success message
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        // Handle parsing error
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log('Password reset successfully.');
          Swal.fire({
            icon: 'success',
            title: 'Password reset status',
            text: 'Password reset successfully, You can login with your new password ',
            timer: 6000,
            timerProgressBar: true,
          });;
          this.router.navigate(['/login']);
          // Optionally, you can display a success message to the user
        } else {
          console.error('Error resetting password:', error);
          // Handle other error scenarios
        }
      }
    );
  }
  
  
  
  

}
