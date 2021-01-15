import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/services/course/course.service';
import { GlobalConfirmComponent } from '../global-confirm/global-confirm.component';

@Component({
  selector: 'app-deregister-course',
  templateUrl: './deregister-course.component.html',
  styleUrls: ['./deregister-course.component.scss']
})
export class DeregisterCourseComponent implements OnInit {

  reasonGroup: FormGroup = this.fb.group({
    reason: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
  });

  course: Course = this.data.course;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {course: Course},
              private dialog: MatDialog, private dialogRef: MatDialogRef<DeregisterCourseComponent>) { }

  ngOnInit(): void {
  }

  Deregister(): void {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
      data: { confirmation: 'Are you sure that you want to deregister this course?'}
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        // dereg
      } else {
        // close
      }
    });
  }

}
