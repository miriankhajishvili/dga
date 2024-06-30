import { Component, NgModule } from '@angular/core';
import { CustomDatePipe } from '../../core/pipes/custom-date-pipe.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-3',
  standalone: true,
  imports: [
    CustomDatePipe,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatLabel,
    CommonModule,
    MatInputModule],
  templateUrl: './task-3.component.html',
  styleUrl: './task-3.component.scss',
  providers: [DatePipe],
})
export class Task3Component {
  inputDate: any;

}
