import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-4',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, NgIf],
  templateUrl: './task-4.component.html',
  styleUrl: './task-4.component.scss'
})
export class Task4Component implements OnInit {

  currentDate: Date = new Date();
  daysInMonth: number[] = [];
  previousMonthDays: number[] = [];
  nextMonthDays: number[] = [];
  firstDay: number = 0;

  holidays: Date[] = [
    new Date(2024, 5, 4), // June 4th, 2024
    new Date(2024, 5, 20) ,// June 20th, 2024
    new Date(2024, 6, 4), //july 4th, 2024
    new Date(2024, 6, 20), //july 4th, 2024
    new Date(2024, 7, 4),
    new Date(2024, 7, 20)
  ];
  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    this.firstDay = (firstDayOfMonth.getDay() + 6) % 7;
    this.daysInMonth = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

    const lastDayOfPreviousMonth = new Date(year, month, 0);
    this.previousMonthDays = Array.from(
      { length: this.firstDay },
      (_, i) => lastDayOfPreviousMonth.getDate() - i
    ).reverse();

    const remainingDays = 42 - (this.firstDay + this.daysInMonth.length);
    this.nextMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }

  isHoliday(day: number): boolean {
    return this.holidays.some(
      holiday =>
        holiday.getDate() === day &&
        holiday.getMonth() === this.currentDate.getMonth() &&
        holiday.getFullYear() === this.currentDate.getFullYear()
    );
  }
}
