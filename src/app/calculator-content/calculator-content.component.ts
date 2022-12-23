import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator-content',
  templateUrl: './calculator-content.component.html',
  styleUrls: ['./calculator-content.component.css']
})
export class CalculatorContentComponent {
  actualNumber: string;
  maxDigits: number = 16;
  operation: string;
  firstNumber: string;
  lastNumber: string;

  constructor() {
    this.actualNumber = '0';
    this.operation = 'x';
    this.firstNumber = '23555';
    this.lastNumber = '23';
  }

  addDigit(digit: string): void {
    let number = this.actualNumber.replaceAll('.', '');

    const numberDigits = number.replace(',', '').length;
    if (numberDigits >= this.maxDigits) return;

    if (number.includes(',') && digit === ',') return;
    if (number === '0' && digit !== ',') number = '';

    number += digit;
    this.actualNumber = number;
    this.formatNumber();
  }

  clearNumber(): void {
    this.actualNumber = '0';
  }

  backspace(): void {
    let number = this.actualNumber.replaceAll('.', '');
    if (number === '0') return;
    number = this.actualNumber.slice(0, -1);
    if (number === '') number = '0';
    this.actualNumber = number;
    this.formatNumber();
  }

  formatNumber(): void {
    const actualNumber = this.actualNumber.replaceAll('.', '').split(',');
    let beforeComma = '';
    let afterComma = '';

    if (this.actualNumber.includes(',')) {
      afterComma = actualNumber[1]
      const numberBeforeComma = Number.parseFloat(actualNumber[0]);
      beforeComma = new Intl.NumberFormat().format(numberBeforeComma);
      this.actualNumber = `${beforeComma},${afterComma}`;
    } else {
      const numberBeforeComma = Number.parseFloat(actualNumber[0]);
      beforeComma = new Intl.NumberFormat().format(numberBeforeComma);
      this.actualNumber = beforeComma;
    }
  }
}
