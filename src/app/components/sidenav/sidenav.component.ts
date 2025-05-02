import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { NavlinksComponent } from '../navlinks/navlinks.component';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';



@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, NavlinksComponent, MaterialModule],
  templateUrl: './sidenav.component.html',
  styleUrl: '../component.scss',
})
export class SideNavComponent {
  date = new Date();
  constructor(public route: Router) {}
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result: { matches: any }) => result.matches),
      shareReplay()
    );
}
