import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingCourse } from '../../../models/training-course';
import { CourseService } from '../../../services/course/course.service';
import { HttpClient } from '@angular/common/http';
import { RatingService } from '../../../services/rating/rating.service';

import { Register } from '../../../models/register';
import { RegisterService } from '../../../services/register/register.service';


@Component({
  selector: 'app-courseinformation',
  templateUrl: './courseinformation.component.html',
  styleUrls: ['./courseinformation.component.css']
})
export class CourseinformationComponent implements OnInit {
  appUserId = 1;
  selectedCourse!: TrainingCourse;
  register !: Register;
  showDetails: boolean = false;
  registers: Register[] = [];

  constructor(private route: ActivatedRoute, private courseService: CourseService, private http: HttpClient, private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCourseDetails(Number(id));
    }
  }

  getCourseDetails(id: number) {
    
    this.courseService.getTrainingCourseById(id).subscribe(
      (course: TrainingCourse) => {
        this.selectedCourse = course;
        this.showDetails = true;
        console.log(course);
      },
      
      (error) => {
        console.log(error);
      }
    );
  }
  Stats(idcourse: number) {
    this.router.navigate(['/stats', idcourse]);
  }

  joinCourse(courseId: number) {
    // Check if the user has already joined the course
    this.registerService.isUserRegistered(courseId, this.appUserId).subscribe(
      (hasJoinedCourse) => {
        if (hasJoinedCourse) {
          alert('You have already joined this course!');
          return;
        }

        // Join the course
        const url = `http://localhost:8092/Register/joinCourse/${courseId}/?appUserId=${this.appUserId}`;
        this.http.post(url, {}).subscribe(
          () => {
            // Success
            alert('Your registration request has been sent!');
          },
          (error) => {
            // Error
            console.log(error);
            alert('Failed to join the course.');
          }
        );

        // Get the registers for the current user
        this.registerService.getRegistersByAppUserId(this.appUserId).subscribe(
          (registers) => {
            // Update the status of the registration to "pending"
            const register = registers.find((register) => register.trainingCourse.id === courseId);
            if (register) {
              this.registerService.updateRegistrationStatus(register.idRegister, 'pending').subscribe(() => {
                // Success
              });
            }
          },
          (error) => {
            // Error
            console.log(error);
            alert('Failed to get your registrations.');
          }
        );
      },
      (error) => {
        // Error
        console.log(error);
        alert('Failed to check if you have already joined the course.');
      }
    );
  }

  }
