import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-5',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './task-5.component.html',
  styleUrls: ['./task-5.component.scss']
})
export class Task5Component {
  inputValue1: string = '';
  inputValue2: string = '';
  matchPercentages: { originalValue: string, processedValue: string, percentage: number }[] = [];

  matchValues() {
    const value1 = this.inputValue1.trim().toLowerCase();
    const values = this.inputValue2.split(',').map(val => val.trim().toLowerCase());

    this.matchPercentages = values.map(originalValue => {
      const processedValue = originalValue.replace(/\s+/g, '');
      const matchPercentage = this.calculateMatchPercentage(value1, processedValue);
      return { originalValue, processedValue, percentage: matchPercentage };
    });
  }

  calculateMatchPercentage(value1: string, value2: string): number {
    const longestMatch = this.findLongestMatch(value1, value2);
    const percentage = (longestMatch / value1.length) * 100;
    return parseFloat(percentage.toFixed(2));
  }

  findLongestMatch(value1: string, value2: string): number {
    let longestMatch = 0;
    const value2Length = value2.length;
    const value1Length = value1.length;

    for (let i = 0; i < value2Length; i++) {
      let matchLength = 0;

      for (let j = 0; j < value1Length && (i + j) < value2Length; j++) {
        if (value1[j] === value2[i + j]) {
          matchLength++;
        } else {
          break;
        }
      }

      longestMatch = Math.max(longestMatch, matchLength);
    }

    return longestMatch;
  }
}
