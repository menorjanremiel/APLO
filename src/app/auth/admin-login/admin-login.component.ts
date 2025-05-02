import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  @Input() type?: any;
  form: FormGroup;
  showPassword: boolean = false;
  error: any;
  isLoggedin: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  constructor(
    private session: SessionService,
    private route: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dt: DataService
  ) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined' &&
      !!sessionStorage.getItem('raw')
    ) {
      this.route.navigate(['/admin']);
    }
  }

  getError(controlName: string) {
    const control = this.form.get(controlName);
    if (!control || !control.errors) {
      return ''; // Return empty string if control doesn't exist or has no errors
    }
    const errors = control.errors as any;
    if (errors['required']) {
      return 'This field is required.';
    }
    return ''; // Return empty string if error type is not recognized
  }

  login() {
    const data: Admin = {
      admin_email: this.form.value.email,
      admin_password: this.form.value.password,
    };

    this.dt
      .apiRequest('/login', data)
      .pipe(
        catchError((err) => {
          this.snackBar.open('An error occurred. Please try again later.', '', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (v) => {
          if (v.status.remarks === 'success') {
            this.Toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
            });
            this.isLoggedin = true;
            this.session.uploadToSession(v.payload);
            this.route.navigate(['/admin']);
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'Login failed, Check your credentials',
            });
          }
        },
        error: (e) => console.error(e),
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
interface Admin {
  admin_email: string;
  admin_password: string;
}
