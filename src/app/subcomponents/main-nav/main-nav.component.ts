import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  loggedIn$: Observable<boolean> = this.authService.isLoggedIn;
  session: any = sessionStorage.getItem('session');
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
              private global: GlobalService, private router: Router) {}

  ngOnInit(): void {
    if (this.session) {
      // tslint:disable-next-line: no-non-null-assertion
      this.session = JSON.parse(sessionStorage.getItem('session')!);
    }
  }

  logOut(drawer: any): void {
    drawer.toggle();
    // tslint:disable-next-line: no-non-null-assertion
    const session = JSON.parse(sessionStorage.getItem('session')!);
    this.authService.Logout(this.global.getServer(), session ).subscribe(res => {
      sessionStorage.removeItem('session');
      this.authService.loggedIn.next(false);
      this.router.navigateByUrl('login');
    });
  }

}
