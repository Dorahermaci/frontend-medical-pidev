import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../../models/register';
import { RegisterService } from '../../../services/register/register.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.component.html',
  styleUrls: ['./list-register.component.css']
})
export class ListRegisterComponent {
  registers: Register[] = [];
 
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.getRegister();
  }


  getRegister() {
    this.registerService.getAllRegisters().subscribe(
      (data) => {
        this.registers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Details(id: number) {
    this.router.navigateByUrl(`Details/${id}`);
  }
  editRegister(register: Register) {
    this.router.navigateByUrl(`/update-register/${register.idRegister}`);
  }

  deleteRegister(register: Register) {
    if (confirm(`Are you sure you want to delete ${register.appUser}?`)) {
      this.registerService.deleteRegister(register.idRegister).subscribe(() => {
        
        this.getRegister();
      });
    }
  }
  updateRegistrationStatus(register: Register, newStatus: string) {
    // Make the API call to update the registration status
    this.registerService.updateRegistrationStatus(register.idRegister, newStatus).subscribe(
      response => {
        // Update the registration object in the local array with the new status
        register.status = newStatus;
        // Display a success message to the user
       // this.toastr.success('Registration status updated successfully', 'Success');
      },
      error => {
        // Display an error message to the user
      //  this.toastr.error('An error occurred while updating the registration status', 'Error');
      }
    );
  }

}

