import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-navlinks',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navlinks.component.html',
  styleUrl: '../component.scss',
})
export class NavlinksComponent {
  checked = false;
  constructor(private dt: DataService) {}
  @Input() where: string = '';
  @Input() name: string = '';
  @Input() icon: any = '';
  @Input() drawer!: MatDrawer;
  @Input() isHandset$!: Observable<boolean>;

  @Output() click = new EventEmitter<void>();

  navigate() {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {

        this.drawer.close();
      }
    });
  }

  navlink() {
    const data: data = { title: this.name, toggle: this.checked };
  }
}
interface data {
  title:string;
  toggle:boolean;
}
