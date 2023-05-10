import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from 'src/app/core/services/user.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTokenComponent } from '../confirm-token/confirm-token.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('dialog', [
      
      transition(':enter', [
        
        animate('0.2s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 })),
      ]),
      
    ]),
  ],
  
})
export class RegisterComponent implements OnInit { 
  
  protected aFormGroup!: FormGroup;
  captchaResponse!: string;


  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  siteKey:string ="6LcOtd0lAAAAAF2W6zS3EN0mJoQu2dEDJWk2dE6S";

  roles = [ 'DOCTOR', 'PATIENT', 'TECHNICIAN']
  user = {
    firstName: '',
    lastName: '',
    email: '',
    Role :"",
    password: '',
    phonenumber: '',
    CIN:'',
    job :''
  };

  constructor(private userService:UserService , private router:Router, private formBuilder: FormBuilder
    ,private dialog: MatDialog){
  }
  onSubmit() {
    const token = this.aFormGroup.get('recaptcha')?.value;    
    if (!token) {
      Swal.fire({
        icon: 'info',
        title: 'Captcha status',
        text: 'Proceed with the captcha before making an account ! ',
        timer: 6000,
        timerProgressBar: true,
      });;
      return;
    }
    this.userService.addUser(this.user)
      .subscribe(() => {
        
        // Registration successful, redirect to login page
        
        this.router.navigate(['/login']);
      });

      const dialogRef = this.dialog.open(ConfirmTokenComponent, {
        width: '500px',
        data: { email: this.user.email },
        panelClass: 'my-dialog-class'
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        // handle popup closed here
      });
      
      this.router.navigate(['/login']);
      (error: any) => {
        console.log(error);
        // handle error here
       
      }
    } 
    ;
  }


  
