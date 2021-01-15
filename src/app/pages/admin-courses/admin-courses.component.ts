import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddCourseComponent } from 'src/app/modals/add-course/add-course.component';
import { GlobalErrorComponent } from 'src/app/modals/global-error/global-error.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  dataSource =  new MatTableDataSource<any>();
  filter = '';
  displayedColumns: string[] = ['courseID', 'courseName', 'courseSubject', 'courseDescription', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private global: GlobalService, private courseService: CourseService,
              private router: Router, private snack: MatSnackBar, private dialog: MatDialog,
              private authService: AuthService) { }

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

  filterTable(filter: any): void{
    this.dataSource.filter = filter;
  }

  addCourse(): void {
    const add = this.dialog.open(AddCourseComponent, {
      disableClose: true
    });

    add.afterClosed().subscribe(res => {
      this.readCourses();
    });
  }

  updateCourse(course: any): void {
    const courseSession = {
      ...course,
      // tslint:disable-next-line: no-non-null-assertion
      Session: JSON.parse(sessionStorage.getItem('session')!)
    };
    this.courseService.checkModification(this.global.getServer(), courseSession).subscribe(res => {
      if (!res.Session.Error) {
        if (res.CanModify) {
          sessionStorage.setItem('session', JSON.stringify(res.Session));
          // modify
        } else {
          sessionStorage.setItem('session', JSON.stringify(res.Session));
          this.dialog.open(GlobalErrorComponent, {
            disableClose: false,
            data: {error: 'This course cannot be updated as it has learners registered.'}
          });
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

  deleteCourse(course: any): void {
    const courseSession = {
      ...course,
      // tslint:disable-next-line: no-non-null-assertion
      Session: JSON.parse(sessionStorage.getItem('session')!)
    };
    this.courseService.checkModification(this.global.getServer(), courseSession).subscribe(res => {
      if (!res.Session.Error) {
        if (res.CanModify) {
          sessionStorage.setItem('session', JSON.stringify(res.Session));
          // modify
        } else {
          sessionStorage.setItem('session', JSON.stringify(res.Session));
          this.dialog.open(GlobalErrorComponent, {
            disableClose: false,
            data: {error: 'This course cannot be deleted as it has learners registered.'}
          });
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

  serverDownSnack(): void {
    this.snack.open('Our servers are currently unreachable. Please try again later.', 'OK', {
      duration: 300,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
