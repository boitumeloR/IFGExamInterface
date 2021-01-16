import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  performanceChart!: Chart;

  constructor(private breakpointObserver: BreakpointObserver,
              private reportService: ReportingService, private snack: MatSnackBar,
              private router: Router, private global: GlobalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.readData();
  }

  readData(): void {
    this.reportService.getReportData(this.global.getServer()).subscribe(res => {
      if (!res.Session.Error) {
        sessionStorage.setItem('session', JSON.stringify(res.Session));
        const averages = res.ChartData.map((zz: any) => zz.MarkAverage);
        const names = res.ChartData.map((zz: any) => zz.CourseName);
        console.log(names);
        this.GenerateChart(averages, names);
      } else {
        sessionStorage.removeItem('session');
        this.authService.loggedIn.next(false);
        this.snack.open(res.Session.Error, 'OK', {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000
        });
        this.router.navigateByUrl('login');
      }
    });
  }

  GenerateChart(amounts: any[], names: any[]): void {
    if (this.performanceChart) {
      this.performanceChart.destroy();
    }

    this.performanceChart = new Chart('performanceChart', {
      type: 'bar',
      data: {
      labels: names,
      datasets: [{
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#c45850'],
        borderColor: '#000000',
        borderWidth: 2,
        data: amounts
    }]
  },
    options: {
      title: {
        display: true,
        text: 'Average Learner Performance Per Course'
      },
      legend: {
        display: false,
      },
      animation: {
        duration: 20000000000
      },
      scales: {
        xAxes: [{
            display: true
        }],
        yAxes: [{
            ticks: {
            beginAtZero: true
          }
      }]
    }
    }
  });
  }
}
