import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingCourse } from '../../../models/training-course';
import { CourseService } from '../../../services/course/course.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
 
  trainingCourse: TrainingCourse = new TrainingCourse();

  constructor(private courseService: CourseService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }


  add(formData: any) {
    this.router.navigateByUrl('/list-coursee');
   
    this.courseService.addTrainingCourse(this.trainingCourse).subscribe(() => {
      console.log('Training course added successfully!');
      console.log(formData);
     
     
    });
    
  }





}


