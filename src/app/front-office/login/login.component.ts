import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ,]
})
export class LoginComponent {
  userList:AppUser[];
  email:any;
  password:any;
  



  constructor(
    private userService:UserService,
    private router:Router,
    
    )
  {this.userList= [];}

  
 

  
  login() {
    this.userService.authenticate(this.email, this.password).subscribe(
      (res: any) => {
        if (res === null){
          Swal.fire({
            icon: 'error',
            title: 'Login Status',
            text: 'Wait for an admin to unlock your account ! ',
            timer: 2000,
            timerProgressBar: true,
          });;
          
        }
        const appUserRole = res.user.appUserRole;
        console.log('Response:', res); // log the response      
        localStorage.setItem('currentUser', JSON.stringify(res)); // save the response in local storage
        Swal.fire({
          icon: 'success',
          title: 'Login Status',
          text: 'Welcome again !.',
          timer: 2000,
          timerProgressBar: true,
        });
        
        if (appUserRole === 'ADMIN') {
          this.router.navigateByUrl('/back/userlist');
        } else {
          this.router.navigateByUrl('/home');
        } 
        
    
      },
      error => {
        console.log(error);
        console.log('Error:', error); // log the error
        Swal.fire({
          icon: 'error',
          title: 'Login Status',
          text: 'Invalid Email or password ! ',
          timer: 2000,
          timerProgressBar: true,
        });;
      }
    );
  }
  
  
  
  
  
}
