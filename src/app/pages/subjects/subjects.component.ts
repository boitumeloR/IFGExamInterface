import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssignMarkComponent } from 'src/app/modals/assign-mark/assign-mark.component';
import { ViewSubjectCoursesComponent } from 'src/app/modals/view-subject-courses/view-subject-courses.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  dataSource =  new MatTableDataSource<any>();
  filter = '';
  displayedColumns: string[] = ['SubjectID', 'SubjectName', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private global: GlobalService, private courseService: CourseService,
              private router: Router, private snack: MatSnackBar, private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.readSubjects();
  }

  readSubjects(): void {
    this.courseService.getLearnerSubjects(this.global.getServer()).subscribe(res => {
      if (!res.Session.Error) {
        sessionStorage.setItem('session', JSON.stringify(res.Session));
        this.dataSource = new MatTableDataSource(res.Subjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  viewCourses(subject: any): void {
    const courses = this.dialog.open(ViewSubjectCoursesComponent, {
      disableClose: true,
      data: {subject}
    });

    courses.afterClosed().subscribe(res => this.readSubjects());
  }

  serverDownSnack(): void {
    this.snack.open('Our servers are currently unreachable. Please try again later.', 'OK', {
      duration: 300,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
