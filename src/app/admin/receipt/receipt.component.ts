import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

export interface Transaction {
  date: Date;
  description: string;
  type: 'Income' | 'Expense';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss',
})
export class ReceiptComponent implements OnInit {
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date().toISOString().split('T')[0];

  netIncome: number = 0;
  totalRevenue: number = 0;
  totalExpenses: number = 0;
  profitMargin: number = 0;
  averageTransaction: number = 0;
  totalTransactions: number = 0;

  transactions: Transaction[] = [];

  constructor() {}

  ngOnInit(): void {
    // Initialize with sample data
    this.calculateFinancialMetrics();
    this.loadTransactions();
  }

  private calculateFinancialMetrics(): void {
    // Sample calculations - replace with actual data
    this.totalRevenue = 15000;
    this.totalExpenses = 8000;
    this.netIncome = this.totalRevenue - this.totalExpenses;
    this.profitMargin = (this.netIncome / this.totalRevenue) * 100;
    this.totalTransactions = 25;
    this.averageTransaction = this.totalRevenue / this.totalTransactions;
  }

  private loadTransactions(): void {
    // Sample transactions - replace with actual data
    this.transactions = [
      {
        date: new Date(),
        description: 'Monthly Subscription',
        type: 'Income',
        amount: 500,
        status: 'Completed',
      },
      {
        date: new Date(),
        description: 'Office Supplies',
        type: 'Expense',
        amount: 200,
        status: 'Completed',
      },
    ];
  }

  exportToPDF() {
    window.print();
  }
}
