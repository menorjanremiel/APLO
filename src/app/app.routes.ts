import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ExpensesComponent } from './admin/expenses/expenses.component';
import { RevenueComponent } from './admin/revenue/revenue.component';
import { ReceiptComponent } from './admin/receipt/receipt.component';
import { HistoryComponent } from './admin/history/history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/admin/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
      {
        path: 'admin/login',
        component: AdminLoginComponent,
        title: 'APLO | Admin Login',
        data: { section: 'auth' },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'APLO | Admin Dashboard',
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        title: 'APLO | Admin Expenses',
      },
      {
        path: 'revenue',
        component: RevenueComponent,
        title: 'APLO | Admin Revenue',
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
        title: 'APLO | Admin Receipt',
      },
      {
        path: 'history',
        component: HistoryComponent,
        title: 'APLO | Admin History',
      },
    ],
  },
];


