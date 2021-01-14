import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  courses = [];
  courseSelect: FormGroup = this.fb.group({
    selectedCourses: this.fb.array([], [Validators.required])
  });

  availCourses$: Observable<any> = this.courseService.availableCourses(this.global.getServer());
  constructor(private fb: FormBuilder, private courseService: CourseService,
              private global: GlobalService, private authService: AuthService,
              private snack: MatSnackBar, private router: Router) { }

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

  onChange(event: any): void {
    const selectedCourses =  this.courseSelect.get('selectedCourses') as FormArray;

    if (event.checked) {
      selectedCourses.push(new FormControl(event.source.value));
    }
    else {
      const i = selectedCourses.controls.findIndex(x => x.value === event.source.value);
      selectedCourses.removeAt(i);
    }
  }

}
