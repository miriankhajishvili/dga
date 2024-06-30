import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDatePipe',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any): any {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      // If the value is a valid date
      return this.datePipe.transform(date, 'HH:mm:ss MMM dd yyyy');
    }
    // If the value is not a date, return it as it is
    return value;
  }
}
