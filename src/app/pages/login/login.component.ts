import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup = this.fb.group({
    EmailAddress: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    Password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  });

  loggedIn$: Observable<boolean> = this.authService.isLoggedIn;
  constructor(private fb: FormBuilder, private global: GlobalService,
              private authService: AuthService, private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  Login(): void {
    this.authService.Login(this.global.getServer(), this.loginGroup.value).subscribe(res => {
      if (!res.Error) {
        // route to home
        sessionStorage.setItem('session', JSON.stringify(res));

        this.loggedIn$ = this.authService.isLoggedIn;
        if (res.UserRoleID === 1) {
          this.router.navigateByUrl('admin-home');
        } else {
          this.router.navigateByUrl('learner-courses');
        }
      } else {
        sessionStorage.setItem('session', JSON.stringify(res));
        this.snack.open(res.Error, 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
      }
    }, (error: HttpErrorResponse) => {
      this.snack.open('An error occured on our servers. Try again later.', 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
    });
  }

  Register(): void {
    this.router.navigateByUrl('register');
  }
}
