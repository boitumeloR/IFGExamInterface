import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

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
              private courseService: CourseService, private global: GlobalService) { }

  ngOnInit(): void {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

  addCourse(): void {

  }

}
