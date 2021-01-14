import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterCoursesComponent } from 'src/app/modals/register-courses/register-courses.component';
import { AuthService, Session } from 'src/app/services/auth/auth.service';
import { AuthCourse, Course, CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-learner-courses',
  templateUrl: './learner-courses.component.html',
  styleUrls: ['./learner-courses.component.scss']
})
export class LearnerCoursesComponent implements OnInit {
  courses: Course[] = [];
  // tslint:disable-next-line: no-non-null-assertion
  session = JSON.parse(sessionStorage.getItem('session')!);
  courses$: Observable<AuthCourse> = this.courseService.getCourses(this.global.getServer());
  constructor(private router: Router, private snack: MatSnackBar,
              private courseService: CourseService, private global: GlobalService,
              private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.session.UserRoleID !== 2) {
      this.snack.open('Only a student can view this page.', 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
      this.router.navigateByUrl('login');
    } else {
      this.courses$.subscribe(res => {
        if (!res.Session.Error) {
          // no session error
          this.courses = res.Courses;
          sessionStorage.setItem('session', JSON.stringify(res.Session));
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
  }

  registerCourses(): void {
    const dialogRef = this.dialog.open(RegisterCoursesComponent, {
      disableClose: true,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // run function after closed
    });
  }

}
