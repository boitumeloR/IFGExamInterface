import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LearnerService } from 'src/app/services/learner/learner.service';

@Component({
  selector: 'app-assign-mark',
  templateUrl: './assign-mark.component.html',
  styleUrls: ['./assign-mark.component.scss']
})
export class AssignMarkComponent implements OnInit {

  learners: any[] = [];
  course: any = this.data.course;

  markGroup: FormGroup = this.fb.group({
    LearnerID: [null, Validators.required],
    Mark: [null, Validators.compose([Validators.required, Validators.max(100)])]
  });
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AssignMarkComponent>,
              private courseService: CourseService, private global: GlobalService,
              private authService: AuthService, private router: Router,
              private snack: MatSnackBar, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {course: any},
              private learnerService: LearnerService) { }

  ngOnInit(): void {
    const learnerData = {
      CourseID: this.course.CourseID,
      // tslint:disable-next-line: no-non-null-assertion
      Session: JSON.parse(sessionStorage.getItem('session')!)
    };
    this.learnerService.getLearnersEnrolled(this.global.getServer(), learnerData).subscribe(res => {
      if (!res.Session.Error) {
        sessionStorage.setItem('session', JSON.stringify(res.Session));
        this.learners = res.Learners;
      } else {
        sessionStorage.removeItem('session');
        this.authService.loggedIn.next(false);
        this.snack.open(res.Session.Error, 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
        this.router.navigateByUrl('login');
        this.dialogRef.close();
      }
    });
  }

  Cancel(): void {
    this.dialogRef.close();
  }

  assignMark(): void {
    //
  }

}
