import { OPERATIONS } from './../utils/util';
import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-calculator-content',
  templateUrl: './calculator-content.component.html',
  styleUrls: ['./calculator-content.component.css'],
})
export class CalculatorContentComponent {
  //Mapping keyboard events
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.keyboardEvents(event);
  }

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
      afterComma = actualNumber[1];
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
    this.verifyLastDigit();
    if (
      this.firstNumber !== '' &&
      this.actualNumber !== this.firstNumber &&
      this.lastNumber === ''
    ) {
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
    this.verifyLastDigit();
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
        this.actualNumber = OPERATIONS.subtract.function(
          firstNumber,
          lastNumber
        );
        break;
      case OPERATIONS.multiply.symbol:
        this.actualNumber = OPERATIONS.multiply.function(
          firstNumber,
          lastNumber
        );
        break;
      case OPERATIONS.divide.symbol:
        this.actualNumber = OPERATIONS.divide.function(firstNumber, lastNumber);
        break;
      case OPERATIONS.percentage.symbol:
        this.actualNumber = OPERATIONS.percentage.function(
          firstNumber,
          lastNumber
        );
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

  verifyLastDigit(): void {
    if (this.actualNumber.charAt(this.actualNumber.length - 1) === ',') {
      this.actualNumber = this.actualNumber.slice(0, -1);
    }
  }

  keyboardEvents(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.clearNumber();
        break;
      case 'Backspace':
        this.backspace();
        break;
      case 'Enter':
        this.calculateResult(true);
        break;
      case OPERATIONS.add.symbol:
        this.addOperation(OPERATIONS.add.symbol);
        break;
      case OPERATIONS.subtract.symbol:
        this.addOperation(OPERATIONS.subtract.symbol);
        break;
      case '*':
        this.addOperation(OPERATIONS.multiply.symbol);
        break;
      case '/':
        this.addOperation(OPERATIONS.divide.symbol);
        break;
      case OPERATIONS.percentage.symbol:
        this.addOperation(OPERATIONS.percentage.symbol);
        break;
      case '1':
        this.addDigit('1');
        break;
      case '2':
        this.addDigit('2');
        break;
      case '3':
        this.addDigit('3');
        break;
      case '4':
        this.addDigit('4');
        break;
      case '5':
        this.addDigit('5');
        break;
      case '6':
        this.addDigit('6');
        break;
      case '7':
        this.addDigit('7');
        break;
      case '8':
        this.addDigit('8');
        break;
      case '9':
        this.addDigit('9');
        break;
      case '0':
        this.addDigit('0');
        break;
      case ',':
        this.addDigit(',');
        break;
      case '.':
        this.addDigit(',');
        break;
      default:
        break;
    }
  }
}
