import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-subject-courses',
  templateUrl: './view-subject-courses.component.html',
  styleUrls: ['./view-subject-courses.component.scss']
})
export class ViewSubjectCoursesComponent implements OnInit {

  subject: any = this.data.subject;
  courses: any[] = [];
  courses$: Observable<any> = this.courseService.getSubjectCourses(this.global.getServer(), this.subject.SubjectID);
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ViewSubjectCoursesComponent>,
              private courseService: CourseService, private global: GlobalService,
              private authService: AuthService, private router: Router,
              private snack: MatSnackBar, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {subject: any}) { }

  ngOnInit(): void {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
