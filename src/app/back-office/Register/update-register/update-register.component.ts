import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../../../models/register';
import { RegisterService } from '../../../services/register/register.service';

@Component({
  selector: 'app-update-register',
  templateUrl: './update-register.component.html',
  styleUrls: ['./update-register.component.css']
})
export class UpdateRegisterComponent {

  register: Register = new Register();
  id!: number;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the training course ID from the URL parameter
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.id = +idString;
      const id = Number(idString);

      // Retrieve the training course details from the server
      this.registerService.getRegisterById(id).subscribe((data: Register) => {
        this.register = data;
      });
    } else {
      // Handle the case where the ID is null
      console.error('Training course ID is null!');
    }
  }

  update(formData: any) {
    // Populate the trainingCourse object with the form data
    this.register.completionStatus = formData.completionStatus;
    this.register.startDate = formData.startDate;
    this.register.endDate = formData.endDate;
   
   
   

    // Update the training course on the server
    this.registerService.updateRegister(this.id,this.register).subscribe(() => {
      console.log(' Register updated successfully!');
     
    });
  }
}
