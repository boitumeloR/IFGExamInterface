import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalConfirmComponent } from 'src/app/modals/global-confirm/global-confirm.component';
import { GlobalErrorComponent } from 'src/app/modals/global-error/global-error.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LearnerService } from 'src/app/services/learner/learner.service';

@Component({
  selector: 'app-deregistrations',
  templateUrl: './deregistrations.component.html',
  styleUrls: ['./deregistrations.component.scss']
})
export class DeregistrationsComponent implements OnInit {

  dataSource =  new MatTableDataSource<any>();
  filter = '';
  filterGroup: FormGroup = this.fb.group({
    CentreID: [null],
    CourseID: [null]
  });
  displayedColumns: string[] = [ 'learnerName', 'courseName', 'status', 'deregisterReason', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private global: GlobalService, private learnerService: LearnerService,
              private router: Router, private snack: MatSnackBar, private dialog: MatDialog,
              private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.readAllDeregs();
  }

  readAllDeregs(): void {
    this.learnerService.getAllDeregistrations(this.global.getServer()).subscribe(res => {
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

  Approve(enrollment: any): void {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
      data: {confirmation: 'Are you sure you want to approve this deregistration?'}
    });

    confirm.afterClosed().subscribe(approve => {
      if (approve) {
        const deregData = {
          CourseID: enrollment.CourseID,
          LearnerID: enrollment.LearnerID,
          IsDeregistered: true,
          // tslint:disable-next-line: no-non-null-assertion
          Session: JSON.parse(sessionStorage.getItem('session')!)
        };

        this.learnerService.approveDeregistration(this.global.getServer(), deregData).subscribe(res => {
          if (!res.Session.Error) {
            if (res.Success) {
              sessionStorage.setItem('session', JSON.stringify(res.Session));
              this.snack.open('Successfully approved.', 'OK', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 3000
              });
              this.readAllDeregs();
            } else {
              this.dialog.open(GlobalErrorComponent, {
                disableClose: true,
                data: {error: res.Error}
              });
              sessionStorage.setItem('session', JSON.stringify(res.Session));
              this.readAllDeregs();
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
        }, (error: HttpErrorResponse) => {
          this.serverDownSnack();
        });
      } else {
        this.readAllDeregs();
      }
    });
  }

  Decline(enrollment: any): void {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
      data: { confirmation: 'Are you sure you want to decline this deregistration?' }
    });

    confirm.afterClosed().subscribe(approve => {
      if (approve) {
        const deregData = {
          CourseID: enrollment.CourseID,
          LearnerID: enrollment.LearnerID,
          IsDeregistered: false,
          // tslint:disable-next-line: no-non-null-assertion
          Session: JSON.parse(sessionStorage.getItem('session')!)
        };

        this.learnerService.approveDeregistration(this.global.getServer(), deregData).subscribe(res => {
          if (!res.Session.Error) {
            if (res.Success) {
              sessionStorage.setItem('session', JSON.stringify(res.Session));
              this.snack.open('Successfully approved.', 'OK', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 3000
              });
              this.readAllDeregs();
            } else {
              this.dialog.open(GlobalErrorComponent, {
                disableClose: true,
                data: {error: res.Error}
              });
              sessionStorage.setItem('session', JSON.stringify(res.Session));
              this.readAllDeregs();
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
        }, (error: HttpErrorResponse) => {
          this.serverDownSnack();
        });
      } else {
        this.readAllDeregs();
      }
    });
  }

  filterTable(filter: any): void{
    this.dataSource.filter = filter;
  }

  serverDownSnack(): void {
    this.snack.open('Our servers are currently unreachable. Please try again later.', 'OK', {
      duration: 300,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
