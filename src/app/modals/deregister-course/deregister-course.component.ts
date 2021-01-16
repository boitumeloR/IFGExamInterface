import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Course, CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { GlobalConfirmComponent } from '../global-confirm/global-confirm.component';

@Component({
  selector: 'app-deregister-course',
  templateUrl: './deregister-course.component.html',
  styleUrls: ['./deregister-course.component.scss']
})
export class DeregisterCourseComponent implements OnInit {

  error = '';
  isError = false;
  reasonGroup: FormGroup = this.fb.group({
    reason: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
  });

  course: Course = this.data.course;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {course: Course},
              private dialog: MatDialog, private dialogRef: MatDialogRef<DeregisterCourseComponent>,
              private courseService: CourseService, private global: GlobalService,
              private authService: AuthService, private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  Deregister(): void {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
      data: { confirmation: 'Are you sure that you want to deregister this course?'}
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        const dereg = {
          DeregisterReason: this.reasonGroup.get('reason')?.value,
          CourseID: this.course.CourseID,
          // tslint:disable-next-line: no-non-null-assertion
          Session: JSON.parse(sessionStorage.getItem('session')!)
        };

        this.courseService.deregisterCourse(this.global.getServer(), dereg).subscribe(result => {
          if (!result.Session.Error) {
            if (result.Success) {
              sessionStorage.setItem('session', JSON.stringify(result.Session));
              this.dialogRef.close();
              this.snack.open('Successfully deregistered.', 'OK', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 3000
              });
            } else {
              this.dialog.open(GlobalConfirmComponent, {
                disableClose: true,
                data: {error: res.Error}
              });
              sessionStorage.setItem('session', JSON.stringify(result.Session));
              this.dialogRef.close();
            }
          } else {
            sessionStorage.removeItem('session');
            this.authService.loggedIn.next(false);
            this.dialogRef.close();
            this.snack.open(result.Session.Error, 'OK', {
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              duration: 3000
            });
            this.router.navigateByUrl('login');
          }
        });
      } else {
        // close
        this.dialogRef.close();
      }
    });
  }

}
