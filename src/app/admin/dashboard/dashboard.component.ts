import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MonthlysplinechartComponent } from './monthlysplinechart/monthlysplinechart.component';

interface Transaction {
  date: string;
  description: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, CommonModule, MonthlysplinechartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  yearLevelChart: Chart | undefined;
  displayedColumns: string[] = ['date', 'description', 'amount', 'status'];
  transactions: Transaction[] = [
    {
      date: '2024-03-20',
      description: 'Monthly Salary',
      amount: 25000.0,
      status: 'Completed',
    },
    {
      date: '2024-03-19',
      description: 'Office Supplies',
      amount: 1500.0,
      status: 'Pending',
    },
    {
      date: '2024-03-18',
      description: 'Internet Bill',
      amount: 2000.0,
      status: 'Completed',
    },
    {
      date: '2024-03-17',
      description: 'Client Project Payment',
      amount: 50000.0,
      status: 'Completed',
    },
    {
      date: '2024-03-16',
      description: 'Software Subscription',
      amount: 3500.0,
      status: 'Failed',
    },
    {
      date: '2024-03-15',
      description: 'Marketing Expenses',
      amount: 8000.0,
      status: 'Completed',
    },
  ];

  ngOnInit(): void {
    this.createYearLevelChart();
  }

  private createYearLevelChart(): void {
    const ctx = document.getElementById('yearLevelChart') as HTMLCanvasElement;
    if (ctx && this.yearLevelChart) {
      this.yearLevelChart.destroy();
    }

    this.yearLevelChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Remaining', 'Used'],
        datasets: [
          {
            data: [10000, 10000],
            backgroundColor: ['#EAEAEA', '#4CCBB0'],
            borderWidth: 3,
            hoverOffset: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: '#333',
            bodyColor: '#666',
            bodyFont: {
              size: 13,
            },
            padding: 12,
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                const total = context.dataset.data.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(1);
                return `₱${value} (${percentage}%)`;
              },
            },
          },
        },
        cutout: '80%',
      },
    });
  }
}

interface YearLevelStats {
  yearLevel: string;
  totalStudents: number;
  color: string;
}
