import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingCourse } from '../../../models/training-course';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  trainingCourse: TrainingCourse = new TrainingCourse();
  id!: number;

  constructor(
    private courseService: CourseService,
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
      this.courseService.getTrainingCourseById(id).subscribe((data: TrainingCourse) => {
        this.trainingCourse = data;
      });
    } else {
      // Handle the case where the ID is null
      console.error('Training course ID is null!');
    }
  }

  update(formData: any) {
    // Populate the trainingCourse object with the form data
    this.trainingCourse.courseName = formData.courseName;
    this.trainingCourse.domain = formData.domain;
    this.trainingCourse.description = formData.description;
    this.trainingCourse.duration = formData.duration;
    this.trainingCourse.startDate = formData.startDate;
    this.trainingCourse.endDate = formData.endDate;
    this.trainingCourse.estimatedTime = Number(formData.estimatedTime);

    // Update the training course on the server
    this.courseService.updateTrainingCourse(this.trainingCourse).subscribe(() => {
      console.log('Training course updated successfully!');
      this.router.navigateByUrl('/list-coursee');
    });
  }
}
