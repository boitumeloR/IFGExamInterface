import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  performanceChart!: Chart;

  constructor(private breakpointObserver: BreakpointObserver,
            ) {}

  ngOnInit(): void {
  }

  readData(): void {

  }

  GenerateChart(amounts: any[], camps: any[]): void {
    if (this.performanceChart) {
      this.performanceChart.destroy();
    }

    this.performanceChart = new Chart('performanceChart', {
      type: 'bar',
      data: {
        labels: camps,
        datasets: [
          {
            backgroundColor: [
              'rgb(153,153,255)',
              'rgb(255,153,238)',
              'rgb(255,204,179)'
            ],
            data: amounts
          }
        ]
      },
      options: {
        title: {
            display: true,
            text: 'Total Accomodation Revenue Per Camp (R)'
        },
        legend: {
          display: true,
          labels: {
              fontColor: 'rgb(255, 99, 132)'
          }
        }
    }
    });
  }
}
