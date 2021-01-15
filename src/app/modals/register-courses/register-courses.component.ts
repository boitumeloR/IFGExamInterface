import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-register-courses',
  templateUrl: './register-courses.component.html',
  styleUrls: ['./register-courses.component.scss']
})
export class RegisterCoursesComponent implements OnInit {

  maxCourses = 0;
  courseReg: any[] = [];
  courses: any[] = [];
  error = '';
  isError = false;
  courseSelect: FormGroup = this.fb.group({
    selectedCourses: this.fb.array([], [Validators.required])
  });

  availCourses$: Observable<any> = this.courseService.availableCourses(this.global.getServer());
  constructor(private fb: FormBuilder, private courseService: CourseService,
              private global: GlobalService, private authService: AuthService,
              private snack: MatSnackBar, private router: Router,
              private dialogRef: MatDialogRef<RegisterCoursesComponent>) { }

  ngOnInit(): void {
    this.availCourses$.subscribe(res => {
      if (!res.Session.Error) {
        // no session error
        sessionStorage.setItem('session', JSON.stringify(res.Session));
        this.maxCourses = res.MaxCourses;
        this.courses = res.Courses;
      } else {
        sessionStorage.removeItem('session');
        this.authService.loggedIn.next(false);
        this.snack.open(res.Session.Error, 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
        this.router.navigateByUrl('login');
      }
    }, (error: HttpErrorResponse) => {
      this.snack.open(error.message, 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
    });
  }

  addCourse(course: any): void {
      this.courseReg.push(course.CourseID);
      const mainIndex = this.courses.findIndex(zz => zz.CourseID === course.CourseID);
      this.courses[mainIndex].CourseStatus = true;
  }

  removeCourse(course: any): void {
    const index  = this.courseReg.findIndex(zz => zz === course.CourseID);
    this.courseReg.splice(index, 1);
    const mainIndex = this.courses.findIndex(zz => zz.CourseID === course.CourseID);
    this.courses[mainIndex].CourseStatus = false;
  }

  registerCourses(): void {
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    const enroll = {
      Courses: this.courseReg,
      Session: session
    };

    this.courseService.enrollCourses(this.global.getServer(), enroll).subscribe(res => {
      if (!res.Session.Error) {
        if (res.Success) {
          sessionStorage.setItem('session', JSON.stringify(res.Session));
          this.dialogRef.close();
          this.snack.open('Successfully registered.', 'OK', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
        } else {
          this.isError = true;
          this.error = res.Error;
          sessionStorage.setItem('session', JSON.stringify(res.Session));
        }
      } else {
        sessionStorage.removeItem('session');
        this.authService.loggedIn.next(false);
        this.snack.open(res.Session.Error, 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
        this.router.navigateByUrl('login');
      }
    });
  }
}
