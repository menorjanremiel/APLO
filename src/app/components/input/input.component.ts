import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: '../component.scss',
})
export class InputComponent {
  @Input() name?: any;
  @Input() text?: string;
  @Input() autocomplete?: string;
  @Input() label?: string;
  @Input() required?: string;
  @Input() placeholder?: any;
  @Input() control: FormControl = new FormControl();
  @Input() type?: any;
  @Input() error?: any;

  modelValue: any;
  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
