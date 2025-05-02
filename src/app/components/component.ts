import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { NavlinksComponent } from './navlinks/navlinks.component';




@NgModule({
  imports: [
    ButtonComponent,
    InputComponent,
    SideNavComponent,
    NavlinksComponent,

  ],
  exports: [
    ButtonComponent,
    InputComponent,
    SideNavComponent,
    NavlinksComponent,

  ],
})
export class component {}
