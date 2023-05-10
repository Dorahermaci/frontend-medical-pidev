import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css']
  })

  

  export class ListUserComponent implements OnInit{
   
    List! : AppUser[];

    ngOnInit(): void {
        this.getAllUsers();
      }

    constructor(private userservice: UserService,
        private router: Router) { }
        
      
        
        
        unlockUser(username: string) {
          this.userservice.getUserByUsername(username).subscribe(
            (user) => {
              if (user.locked === false) {
                Swal.fire({
                  icon: 'info',
                  title: 'User Already Unlocked',
                  text: 'The user account is already unlocked.',
                  timer: 2000,
                  timerProgressBar: true,
                });
              } else {
                this.userservice.unlockUser(username).subscribe(
                  () => {
                    Swal.fire({
                      icon: 'success',
                      title: 'User Unlocked',
                      text: 'The user account has been unlocked.',
                      timer: 2000,
                      timerProgressBar: true,
                    });
                    
                    this.getAllUsers();
                  },
                  error => {
                    console.error('Error unlocking user:', error);
                    // Handle error case appropriately
                  }
                );
              }
            },
            error => {
              console.error('Error retrieving user:', error);
              // Handle error case appropriately
            }
          );
        }
        
        
        

        removeUser(userName: string){
        this.userservice.removeUser(userName).subscribe( data => {
          console.log(data);
          this.getAllUsers();
          Swal.fire({
            icon: 'success',
            title: 'User Deleted',
            text: 'The user has been successfully deleted.',
            timer: 2000,
            timerProgressBar: true,
          });
        })
      }

      private getAllUsers(){
        this.userservice.getAllUsers().subscribe(data => {
          this.List = data;
        });
        
        
      }

      onLogout() {
        this.userservice.logout();
        this.router.navigateByUrl('/');
      }
    

  }