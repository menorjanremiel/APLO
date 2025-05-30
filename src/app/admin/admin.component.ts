import { Component, inject, model, OnDestroy, signal } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NewTransactionComponent } from './dialog/new-transaction/new-transaction.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-admin',
  imports: [
    MaterialModule,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnDestroy {
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  logout() {
    Swal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to exit application',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00458f',
      cancelButtonColor: '#7f8280',
      confirmButtonText: 'Yes, Log me out!',
    }).then((result) => {
      if (result.isConfirmed) {
        //  this.sessionService.deleteData();
        this.router.navigate(['/auth/admin/login']);
      }
    });
  }
  // protected readonly fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  // protected readonly fillerContent = Array.from(
  //   {length: 50},
  //   () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  // );
  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  constructor(private router: Router) {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
