import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  dataSource =  new MatTableDataSource<any>();
  displayedColumns: string[] = ['courseID', 'courseName', 'courseSubject', 'courseDescription', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private global: GlobalService, private courseService: CourseService,
              private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.readCourses();
  }

  readCourses(): void {
    this.courseService.getAdminCourses(this.global.getServer()).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.Courses);
      this.dataSource.paginator = this.paginator;
    }, (error: HttpErrorResponse) => {
      this.serverDownSnack();
    });
  }

  serverDownSnack(): void {
    this.snack.open('Our servers are currently unreachable. Please try again later.', 'OK', {
      duration: 300,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
