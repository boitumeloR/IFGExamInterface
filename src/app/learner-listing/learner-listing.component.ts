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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LearnerListingItem>;
  dataSource!: LearnerListingDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {}
  ngOnInit() {
    this.dataSource = new LearnerListingDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
