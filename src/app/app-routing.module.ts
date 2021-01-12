import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerListingComponent } from './learner-listing/learner-listing.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
