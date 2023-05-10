
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';






export interface ConfirmTokenDialogData {
  email: string;
}

@Component({
  selector: 'app-confirm-token',
  templateUrl: './confirm-token.component.html',
  styleUrls: ['./confirm-token.component.css'],
 
})
export class ConfirmTokenComponent  {

  

  token: string = '';
  error: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmTokenDialogData,
    private userService: UserService,
    private dialogRef: MatDialogRef<ConfirmTokenComponent>,
    private router:Router
  ) {}

  closePopup() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.userService.confirmUser({ token: this.token }).subscribe(
      (response: any) => {
        if (response === 'confirmed') {
          // Confirmation successful
          this.dialogRef.close(); // Close the dialog
        } else {
          // Confirmation failed
          this.error = 'Confirmation failed. Please try again.';
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log('Confirmation sucess.');
          this.dialogRef.close();
          // Optionally, you can display a success message to the user
        } else {
          console.error('Error in confirmation', error);
          // Handle other error scenarios
        }
      }
    );
  }
}
  
 

