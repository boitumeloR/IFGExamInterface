import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddCourseComponent } from 'src/app/modals/add-course/add-course.component';
import { GlobalConfirmComponent } from 'src/app/modals/global-confirm/global-confirm.component';
import { GlobalErrorComponent } from 'src/app/modals/global-error/global-error.component';
import { UpdateCourseComponent } from 'src/app/modals/update-course/update-course.component';
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
      if (!res.Session.Error) {
        sessionStorage.setItem('session', JSON.stringify(res.Session));
        this.dataSource = new MatTableDataSource(res.Courses);
        this.dataSource.paginator = this.paginator;
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
          // update course

          const update = this.dialog.open(UpdateCourseComponent, {
            disableClose: true,
            data: {course}
          });

          update.afterClosed().subscribe(result => {
            this.readCourses();
          });

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
          // delete course
          const confirm = this.dialog.open(GlobalConfirmComponent, {
            disableClose: true,
            data: {confirmation: 'Are you sure you want to delete this course?'}
          });

          confirm.afterClosed().subscribe(result => {
            if (result) {
              // delete
              const delCourse = {
                ...course,
                // tslint:disable-next-line: no-non-null-assertion
                Session: JSON.parse(sessionStorage.getItem('session')!)
              };
              this.courseService.deleteCourse(this.global.getServer(), delCourse).subscribe(del => {
                if (!del.Session.Error) {
                  sessionStorage.setItem('session', JSON.stringify(del.Session));
                  if (del.Success) {
                    this.readCourses();
                    this.snack.open('Successfully deleted course.', 'OK', {
                      verticalPosition: 'bottom',
                      horizontalPosition: 'center',
                      duration: 3000
                    });
                  } else {
                    this.dialog.open(GlobalErrorComponent, {
                      disableClose: true,
                      data: {error: del.Error}
                    });
                    sessionStorage.setItem('session', JSON.stringify(del.Session));
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
            } else {
              this.readCourses();
            }
          });
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
