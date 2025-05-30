import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AddAdminExpensesComponent,
  DialogData,
} from '../../expenses/dialog/add-admin-expenses/add-admin-expenses.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-new-transaction',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
  ],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss',
})
export class NewTransactionComponent {
  readonly dialogRef = inject(MatDialogRef<NewTransactionComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  readonly animal1 = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  onNoClick(): void {
    this.dialogRef.close();
  }

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
}
export interface PeriodicElement {
  name: string;
  amount: number;
  expense_name: string;
  date: string;
  receipt_image: string;
  status: string;
}
