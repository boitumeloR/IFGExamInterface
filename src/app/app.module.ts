import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './subcomponents/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LearnerListingComponent } from './pages/learner-listing/learner-listing.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './pages/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LearnerCoursesComponent } from './pages/learner-courses/learner-courses.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterCoursesComponent } from './modals/register-courses/register-courses.component';
import {MatChipsModule} from '@angular/material/chips';
import { DeregisterCourseComponent } from './modals/deregister-course/deregister-course.component';
import { GlobalConfirmComponent } from './modals/global-confirm/global-confirm.component';
import { AdminCoursesComponent } from './pages/admin-courses/admin-courses.component';
import { UpdateCourseComponent } from './modals/update-course/update-course.component';
import { GlobalErrorComponent } from './modals/global-error/global-error.component';
import { AddCourseComponent } from './modals/add-course/add-course.component';
import { DeregistrationsComponent } from './pages/deregistrations/deregistrations.component';
import { AssignMarkComponent } from './modals/assign-mark/assign-mark.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LearnerListingComponent,
    LoginComponent,
    RegisterUserComponent,
    AdminHomeComponent,
    LearnerCoursesComponent,
    RegisterCoursesComponent,
    DeregisterCourseComponent,
    GlobalConfirmComponent,
    AdminCoursesComponent,
    UpdateCourseComponent,
    GlobalErrorComponent,
    AddCourseComponent,
    DeregistrationsComponent,
    AssignMarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
