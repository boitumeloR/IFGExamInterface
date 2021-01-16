import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LearnerListingDataSource, LearnerListingItem } from './learner-listing-datasource';

@Component({
  selector: 'app-learner-listing',
  templateUrl: './learner-listing.component.html',
  styleUrls: ['./learner-listing.component.scss']
})
export class LearnerListingComponent implements AfterViewInit, OnInit {

  constructor() {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
