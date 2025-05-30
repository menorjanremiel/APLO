import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

interface ActivityLog {
  timestamp: Date;
  action: string;
  description: string;
  module: string;
  user: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
  ],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'timestamp',
    'action',
    'description',
    'module',
    'user',
  ];
  dataSource: MatTableDataSource<ActivityLog>;
  searchTerm: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedActionType: string = '';
  dateRange: string = 'all';
  isLoading: boolean = false;
  totalItems: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<ActivityLog>([]);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    // TODO: Replace with actual API call
    setTimeout(() => {
      const mockData: ActivityLog[] = [
        {
          timestamp: new Date(),
          action: 'create',
          description: 'Created new user account',
          module: 'Users',
          user: 'John Doe',
        },
        // Add more mock data as needed
      ];
      this.dataSource.data = mockData;
      this.totalItems = mockData.length;
      this.isLoading = false;
    }, 1000);
  }

  applyFilter(): void {
    // TODO: Implement filter logic
    this.loadData();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.startDate = null;
    this.endDate = null;
    this.selectedActionType = '';
    this.loadData();
  }

  onPageChange(event: any): void {
    // TODO: Implement pagination logic
    this.loadData();
  }

  getActionClass(action: string): string {
    const classes: { [key: string]: string } = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800',
      login: 'bg-purple-100 text-purple-800',
    };
    return classes[action.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }

  exportToExcel(): void {
    // TODO: Implement Excel export logic
    console.log('Exporting to Excel...');
  }
}
