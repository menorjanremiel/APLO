import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-revenue',
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'expense_name',
    'amount',
    'date',
    'receipt_image',
    'actions',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  searchQuery: string = '';
  selectedType: string = 'all';
  selectedPeriod: string = 'all';
  amountRange: string = 'all';
  totalRevenue: number = 0;
  revenueTypes = [
    { value: 'all', viewValue: 'All Types' },
    { value: 'notarization', viewValue: 'Notarization' },
    { value: 'affidavit', viewValue: 'Affidavit' },
    { value: 'other', viewValue: 'Other Services' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calculateTotalRevenue();
  }

  calculateTotalRevenue() {
    this.totalRevenue = this.dataSource.filteredData.reduce(
      (sum, item) => sum + item.amount,
      0
    );
  }

  applyFilter(event?: Event) {
    if (event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchQuery = filterValue;
    }

    this.dataSource.filterPredicate = (data: PeriodicElement) => {
      const matchesSearch = this.searchQuery
        ? data.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          data.expense_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          data.amount.toString().includes(this.searchQuery)
        : true;

      const matchesPeriod = this.filterByPeriod(data.date);
      const matchesAmount = this.filterByAmount(data.amount);

      return matchesSearch && matchesPeriod && matchesAmount;
    };

    this.dataSource.filter = 'true';
    this.calculateTotalRevenue();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByPeriod(date: string): boolean {
    if (this.selectedPeriod === 'all') return true;

    const recordDate = new Date(date);
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    switch (this.selectedPeriod) {
      case 'today':
        return recordDate.toDateString() === new Date().toDateString();
      case 'weekly':
        return recordDate >= startOfWeek;
      case 'monthly':
        return recordDate >= startOfMonth;
      default:
        return true;
    }
  }

  filterByAmount(amount: number): boolean {
    if (this.amountRange === 'all') return true;

    switch (this.amountRange) {
      case '0-100':
        return amount >= 0 && amount <= 100;
      case '100-500':
        return amount > 100 && amount <= 500;
      case '500+':
        return amount > 500;
      default:
        return true;
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedPeriod = 'all';
    this.amountRange = 'all';
    this.applyFilter();
  }

  openAddRevenueDialog() {
    // TODO: Implement dialog for adding new revenue
    this.snackBar.open('Add Revenue functionality coming soon', 'Close', {
      duration: 3000,
    });
  }

  editRevenue(element: PeriodicElement) {
    // TODO: Implement edit functionality
    this.snackBar.open('Edit functionality coming soon', 'Close', {
      duration: 3000,
    });
  }

  deleteRevenue(element: PeriodicElement) {
    // TODO: Implement delete functionality
    this.snackBar.open('Delete functionality coming soon', 'Close', {
      duration: 3000,
    });
  }

  previewReceipt(imagePath: string) {
    // TODO: Implement receipt preview
    this.snackBar.open('Receipt preview coming soon', 'Close', {
      duration: 3000,
    });
  }

  exportToExcel() {
    // TODO: Implement Excel export
    this.snackBar.open('Export functionality coming soon', 'Close', {
      duration: 3000,
    });
  }
}

export interface PeriodicElement {
  name: string;
  amount: number;
  expense_name: string;
  date: string;
  receipt_image: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Jan Remiel Menor',
    amount: 1500,
    expense_name: 'Document Notarization',
    receipt_image: 'uploads/receipt1.jpg',
    date: '2025-04-26',
  },
  {
    name: 'Jan Remiel Menor',
    amount: 2000,
    expense_name: 'Affidavit Processing',
    receipt_image: 'uploads/receipt2.jpg',
    date: '2025-04-26',
  },
];
