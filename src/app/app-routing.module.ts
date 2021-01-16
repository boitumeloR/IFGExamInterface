import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminCoursesComponent } from './pages/admin-courses/admin-courses.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { LearnerCoursesComponent } from './pages/learner-courses/learner-courses.component';
import { LearnerListingDataSource } from './pages/learner-listing/learner-listing-datasource';
import { LearnerListingComponent } from './pages/learner-listing/learner-listing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: {roleID: 1}
  },
  {
    path: 'admin-courses',
    component: AdminCoursesComponent,
    canActivate: [AuthGuard],
    data: {roleID: 1}
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'learner-courses',
    component: LearnerCoursesComponent,
    canActivate: [AuthGuard],
    data: {roleID: 2}
  },
  {
    path: 'learner-listings',
    component: LearnerListingComponent,
    canActivate: [AuthGuard],
    data: {roleID: 1}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
