import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddAdminExpensesComponent } from './dialog/add-admin-expenses/add-admin-expenses.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  displayedColumns: string[] = [
    'name',
    'expense_name',
    'amount',
    'date',
    'status',
    'receipt_image',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Filter properties
  searchQuery: string = '';
  selectedPeriod: string = 'all';
  selectedStatus: string = 'all';
  amountRange: string = 'all';
  totalExpense: number = 0;

  expenses: Expenses[] = [
    { value: 'admin', viewValue: 'Admin Expenses' },
    { value: 'client', viewValue: 'Client Expenses' },
  ];

  selectedExpenses = this.expenses[0].value;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calculateTotalExpense();
  }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(element?: PeriodicElement): void {
    const dialogRef = this.dialog.open(AddAdminExpensesComponent, {
      data: { name: this.name(), animal: this.animal(), expense: element },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result (add/edit expense)
        console.log('Dialog result:', result);
      }
    });
  }

  applyFilter(event?: Event): void {
    if (event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchQuery = filterValue;
    }

    this.dataSource.filterPredicate = (
      data: PeriodicElement,
      filter: string
    ) => {
      const searchStr = filter.toLowerCase();
      const matchesSearch =
        data.name.toLowerCase().includes(searchStr) ||
        data.expense_name.toLowerCase().includes(searchStr) ||
        data.amount.toString().includes(searchStr);

      const matchesPeriod = this.filterByPeriod(data.date);
      const matchesStatus =
        this.selectedStatus === 'all' || data.status === this.selectedStatus;
      const matchesAmount = this.filterByAmount(data.amount);

      return matchesSearch && matchesPeriod && matchesStatus && matchesAmount;
    };

    this.dataSource.filter = this.searchQuery;
    this.calculateTotalExpense();
  }

  private calculateTotalExpense(): void {
    this.totalExpense = this.dataSource.filteredData.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }

  private filterByPeriod(date: string): boolean {
    const expenseDate = new Date(date);
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    switch (this.selectedPeriod) {
      case 'today':
        return expenseDate.toDateString() === new Date().toDateString();
      case 'weekly':
        return expenseDate >= startOfWeek;
      case 'monthly':
        return expenseDate >= startOfMonth;
      case 'all':
      default:
        return true;
    }
  }

  private filterByAmount(amount: number): boolean {
    switch (this.amountRange) {
      case '0-100':
        return amount >= 0 && amount <= 100;
      case '100-500':
        return amount > 100 && amount <= 500;
      case '500+':
        return amount > 500;
      case 'all':
      default:
        return true;
    }
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedPeriod = 'all';
    this.selectedStatus = 'all';
    this.amountRange = 'all';
    this.applyFilter();
  }

  confirmDelete(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(AddAdminExpensesComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the expense "${element.expense_name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle delete operation
        console.log('Deleting expense:', element);
      }
    });
  }

  viewReceipt(imageUrl: string): void {
    // Implement receipt viewing logic
    console.log('Viewing receipt:', imageUrl);
  }

  exportExpenses(): void {
    // Implement export logic
    console.log('Exporting expenses...');
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

export interface PeriodicElement {
  name: string;
  amount: number;
  expense_name: string;
  date: string;
  receipt_image: string;
  status: string;
}

interface Expenses {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Jan Remiel Menor',
    amount: 1000,
    expense_name: 'Office Rent',
    receipt_image: 'uploads/admin_rent.jpg',
    date: '2023-10-01',
    status: 'approved',
  },
  {
    name: 'John Doe',
    amount: 250,
    expense_name: 'Office Supplies',
    receipt_image: 'uploads/supplies.jpg',
    date: '2024-03-15',
    status: 'pending',
  },
  {
    name: 'Jane Smith',
    amount: 750,
    expense_name: 'Software License',
    receipt_image: 'uploads/software.jpg',
    date: '2024-03-10',
    status: 'rejected',
  },
];
