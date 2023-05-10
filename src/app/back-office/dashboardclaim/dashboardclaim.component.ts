import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboardclaim',
  templateUrl: './dashboardclaim.component.html',
  styleUrls: ['./dashboardclaim.component.css']
})
export class DashboardclaimComponent implements OnInit {

  totalClaims: number = 0;
  pendingClaims: number = 0;
  inProgressClaims: number = 0;
  approvedClaims: number = 0;
  rejectedClaims: number = 0;
  completedClaims: number = 0;

  @ViewChild('canvas', {static: true}) canvas!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8091/dashboard', { responseType: 'text' }).subscribe((data: any) => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const totalClaims = html.querySelector('tr:nth-child(1) td:nth-child(2)');
      const pendingClaims = html.querySelector('tr:nth-child(2) td:nth-child(2)');
      const inProgressClaims = html.querySelector('tr:nth-child(3) td:nth-child(2)');
      const approvedClaims = html.querySelector('tr:nth-child(4) td:nth-child(2)');
      const rejectedClaims = html.querySelector('tr:nth-child(5) td:nth-child(2)');
      const completedClaims = html.querySelector('tr:nth-child(6) td:nth-child(2)');


      this.totalClaims = totalClaims ? parseInt(totalClaims.textContent || '0') : 0;
      this.pendingClaims = pendingClaims ? parseInt(pendingClaims.textContent || '0') : 0;
      this.inProgressClaims = inProgressClaims ? parseInt(inProgressClaims.textContent || '0') : 0;
      this.approvedClaims = approvedClaims ? parseInt(approvedClaims.textContent || '0') : 0;
      this.rejectedClaims = rejectedClaims ? parseInt(rejectedClaims.textContent || '0') : 0;
      this.completedClaims = completedClaims ? parseInt(completedClaims.textContent || '0') : 0;

      const ctx = this.canvas.nativeElement.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Claims', 'Pending Claims', 'In Progress Claims', 'Approved Claims', 'Rejected Claims', 'Completed Claims'],
          datasets: [{
            label: 'Claims',
            data: [this.totalClaims, this.pendingClaims, this.inProgressClaims, this.approvedClaims, this.rejectedClaims, this.completedClaims],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            
          }
        }
        
        
      });
    });
  }
}
