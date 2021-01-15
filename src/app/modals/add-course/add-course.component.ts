import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { GlobalErrorComponent } from '../global-error/global-error.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  centres$: Observable<any> = this.courseService.getCourseCentres(this.global.getServer());
  grades$: Observable<any> = this.courseService.getCourseGrades(this.global.getServer());
  subjects$: Observable<any> = this.courseService.getCourseSubjects(this.global.getServer());
  courseGroup: FormGroup = this.fb.group({
    CourseName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    CourseDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150)])],
    CourseSubjectID: [null, Validators.required],
    CourseGradeID: [null, Validators.required],
    CourseCentreID: [null, Validators.required]
  });
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddCourseComponent>,
              private courseService: CourseService, private global: GlobalService,
              private authService: AuthService, private router: Router,
              private snack: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

  addCourse(): void {
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
          this.snack.open('Successfully added course.', 'OK', {
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
