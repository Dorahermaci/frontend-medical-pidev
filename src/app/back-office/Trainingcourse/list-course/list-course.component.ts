import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingCourse } from '../../../models/training-course';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent {
  courses: TrainingCourse[] = [];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.getCourses();
  }
  openAddCourseDialog() {
    console.log('im here');
    this.router.navigateByUrl('/add-course');
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
  editCourse(course: TrainingCourse) {
    this.router.navigateByUrl(`/update-course/${course.id}`);
  }

  deleteCourse(course: TrainingCourse) {
    if (confirm(`Are you sure you want to delete ${course.courseName}?`)) {
      this.courseService.deleteTrainingCourse(course.id).subscribe(() => {
        console.log(`${course.courseName} deleted successfully!`);
        this.getCourses();
      });
    }
  }
  openMeetingLink() {
    this.courseService.openMeetingLink().subscribe(
      () => {
        console.log('Meeting link opened successfully.');
      },
      (error) => {
        console.log('Error opening meeting link:', error);
      }
    );
  }
}
