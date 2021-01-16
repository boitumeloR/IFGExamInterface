import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddCourseComponent } from 'src/app/modals/add-course/add-course.component';
import { GlobalConfirmComponent } from 'src/app/modals/global-confirm/global-confirm.component';
import { GlobalErrorComponent } from 'src/app/modals/global-error/global-error.component';
import { UpdateCourseComponent } from 'src/app/modals/update-course/update-course.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LearnerService } from 'src/app/services/learner/learner.service';

@Component({
  selector: 'app-learner-listing',
  templateUrl: './learner-listing.component.html',
  styleUrls: ['./learner-listing.component.scss']
})
export class LearnerListingComponent implements AfterViewInit, OnInit {

  dataSource =  new MatTableDataSource<any>();
  filter = '';
  displayedColumns: string[] = [ 'learnerName', 'learnerSurname', 'emailAddress', 'ID', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private global: GlobalService, private learnerService: LearnerService,
              private router: Router, private snack: MatSnackBar, private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.readAllLearners();
  }

  ngAfterViewInit(): void {
  }

  readAllLearners(): void {
    this.learnerService.getAllLearners(this.global.getServer()).subscribe(res => {
      if (!res.Session.Error) {
        sessionStorage.setItem('session', JSON.stringify(res.Session));
        this.dataSource = new MatTableDataSource(res.Learners);
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
      this.readAllLearners();
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
