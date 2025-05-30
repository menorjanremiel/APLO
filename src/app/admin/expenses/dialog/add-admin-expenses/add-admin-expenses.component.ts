import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin-expenses',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './add-admin-expenses.component.html',
  styleUrl: './add-admin-expenses.component.scss',
})
export class AddAdminExpensesComponent {
  readonly dialogRef = inject(MatDialogRef<AddAdminExpensesComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  expenseName: string = '';
  amount: number = 0;
  status: string = 'pending';
  receiptImage: string = '';
  isEditMode: boolean = false;

  statusOptions = [
    { value: 'pending', viewValue: 'Pending' },
    { value: 'approved', viewValue: 'Approved' },
    { value: 'rejected', viewValue: 'Rejected' },
  ];

  constructor() {
    if (this.data.expense) {
      this.isEditMode = true;
      this.expenseName = this.data.expense.expense_name;
      this.amount = this.data.expense.amount;
      this.status = this.data.expense.status;
      this.receiptImage = this.data.expense.receipt_image;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const result = {
      expense_name: this.expenseName,
      amount: this.amount,
      status: this.status,
      receipt_image: this.receiptImage,
    };
    this.dialogRef.close(result);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
      // For now, just store the file name
      this.receiptImage = file.name;
    }
  }
}

export interface DialogData {
  animal?: string;
  name?: string;
  expense?: {
    expense_name: string;
    amount: number;
    status: string;
    receipt_image: string;
  };
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}
