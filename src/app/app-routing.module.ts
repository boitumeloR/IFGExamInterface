import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerListingComponent } from './pages/learner-listing/learner-listing.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
