import { OPERATIONS } from './../utils/util';
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
  resetAfterSetOperation: boolean = false;
  resetAfterGetResult: boolean = false;

  constructor() {
    this.actualNumber = '0';
    this.operation = '';
    this.firstNumber = '';
    this.lastNumber = '';
  }

  addDigit(digit: string): void {

    if (this.resetAfterSetOperation && this.resetAfterGetResult) {
      this.resetAfterSetOperation = false;
      this.resetAfterGetResult = false;
      this.lastNumber = '';
      this.actualNumber = '0';
    }
    if (this.resetAfterSetOperation) {
      this.actualNumber = '0';
      this.resetAfterSetOperation = false;
    }
    if (this.resetAfterGetResult) {
      this.clearNumber();
      this.resetAfterGetResult = false;
    }

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
    this.firstNumber = '';
    this.lastNumber = '';
    this.operation = '';
    this.resetAfterSetOperation = false;
    this.resetAfterGetResult = false;
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

  addOperation(operation: string): void {
    this.resetAfterSetOperation = true;
    if ((this.firstNumber !== '' && this.actualNumber !== this.firstNumber) && this.lastNumber === '' && this.resetAfterSetOperation) {
      this.calculateResult(false);
      this.operation = operation;
      return;
    }
    this.operation = operation;
    if (this.firstNumber === this.actualNumber) return;
    if (this.firstNumber === '' || this.resetAfterGetResult) {
      this.firstNumber = this.actualNumber;
      return;
    }
  }

  calculateResult(resultButton: boolean): void {
    let firstNumber = 0;
    let lastNumber = 0;
    if (resultButton) {
      if (this.lastNumber === '') {
        this.lastNumber = this.actualNumber;
      } else {
        this.firstNumber = this.actualNumber;
      }
      firstNumber = this.parseStringToFloat(this.firstNumber);
      lastNumber = this.parseStringToFloat(this.lastNumber);
    } else {
      firstNumber = this.parseStringToFloat(this.firstNumber);
      lastNumber = this.parseStringToFloat(this.actualNumber);
    }

    switch (this.operation) {
      case OPERATIONS.add.symbol:
        this.actualNumber = OPERATIONS.add.function(firstNumber, lastNumber);
        break;
      case OPERATIONS.subtract.symbol:
        this.actualNumber = OPERATIONS.subtract.function(firstNumber, lastNumber);
        break;
      case OPERATIONS.multiply.symbol:
        this.actualNumber = OPERATIONS.multiply.function(firstNumber, lastNumber);
        break;
      case OPERATIONS.divide.symbol:
        this.actualNumber = OPERATIONS.divide.function(firstNumber, lastNumber);
        break;
      case OPERATIONS.percentage.symbol:
        this.actualNumber = OPERATIONS.percentage.function(firstNumber, lastNumber);
        break;
      default:
        return;
    }
    this.formatNumber();
    this.resetAfterGetResult = true;
    if (!resultButton) this.firstNumber = this.actualNumber;
  }

  parseStringToFloat(str: string): number {
    return Number.parseFloat(str.replaceAll('.', '').replace(',', '.'));
  }
}
