import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private snack: MatSnackBar, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const session = sessionStorage.getItem('session');
    const role: number = route.data.roleID;
    if (session) {
      const sessionObj = JSON.parse(session);
      if (sessionObj.UserRoleID === role) {
        return true;
      } else {
        this.snack.open('You are not authorised to view this page', 'OK',  {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
        this.authService.loggedIn.next(false);
        sessionStorage.removeItem('session');
        this.router.navigateByUrl('login');
        return false;
      }
    } else {
      this.snack.open('Login to view this page', 'OK',  {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
      this.authService.loggedIn.next(false);
      sessionStorage.removeItem('session');
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
