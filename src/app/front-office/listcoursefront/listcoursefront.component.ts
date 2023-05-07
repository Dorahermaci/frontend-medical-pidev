import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingCourse } from '../../models/training-course';
import { CourseService } from '../../services/course/course.service';


@Component({
  selector: 'app-listcoursefront',
  templateUrl: './listcoursefront.component.html',
  styleUrls: ['./listcoursefront.component.css']
})
export class ListcoursefrontComponent 
 {
  courses: TrainingCourse[] = [];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.getCourses();
  }
  

  getCourses() {
    this.courseService.getAllTrainingCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Details(id: number) {
    this.router.navigateByUrl(`Details/${id}`);
  }
  

  
}

