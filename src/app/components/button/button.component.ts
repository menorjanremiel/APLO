import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './button.component.html',
  styleUrl: '../component.scss',
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() type: string = '';
  @Input() btn: string = '';
  @Input() isDisabled: boolean = false;
}
