import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { AddCourseComponent } from '../add-course/add-course.component';
import { GlobalErrorComponent } from '../global-error/global-error.component';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {

  courseData: any = this.data;
  centres$: Observable<any> = this.courseService.getCourseCentres(this.global.getServer());
  grades$: Observable<any> = this.courseService.getCourseGrades(this.global.getServer());
  subjects$: Observable<any> = this.courseService.getCourseSubjects(this.global.getServer());
  courseGroup: FormGroup = this.fb.group({
    CourseName: [this.courseData.CourseName, Validators.compose([Validators.required, Validators.maxLength(50)])],
    CourseDescription: [this.courseData.CourseDescription, Validators.compose([Validators.required, Validators.maxLength(150)])],
    CourseSubjectID: [this.courseData.CourseSubjectID, Validators.required],
    CourseGradeID: [this.courseData.CourseGradeID, Validators.required],
    CourseCentreID: [this.courseData.CourseCentreID, Validators.required]
  });
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddCourseComponent>,
              private courseService: CourseService, private global: GlobalService,
              private authService: AuthService, private router: Router,
              private snack: MatSnackBar, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {course: any}) { }

  ngOnInit(): void {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

  updateCourse(): void {
    const preCourse = this.courseGroup.value;
    const postCourse = {
      ...preCourse,
      // tslint:disable-next-line: no-non-null-assertion
      Session: JSON.parse(sessionStorage.getItem('session')!)
    };

    this.courseService.addCourse(this.global.getServer(), postCourse).subscribe(res => {
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
          this.dialog.open(GlobalErrorComponent, {
            disableClose: true,
            data: {error: res.Error}
          });
          sessionStorage.setItem('session', JSON.stringify(res.Session));
          this.dialogRef.close();
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
