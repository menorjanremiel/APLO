import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { share } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, MaterialModule],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss',
})
export class NavLinkComponent {
  activeFragment: any;
  constructor(public route: ActivatedRoute) {
    this.activeFragment = this.route.fragment.pipe(share());
  }
}
