import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
      {
        path: 'admin/login',
        component: AdminLoginComponent,
        title: 'GCATTEND | Admin Login',
        data: { section: 'auth' },
      }
    ],
  },
];


