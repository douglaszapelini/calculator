import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  types = ["AC", "±", "%", "÷", "x", "-", "+", "="];

  @Output() darkChange = new EventEmitter<boolean>();
  @Input() dark: any;

  handleTheme() {
    this.dark = !this.dark;
    this.darkChange.emit(this.dark);
    let body = document.querySelector('body');
    let buttons = document.querySelectorAll('button');
    let keyboard = document.getElementById('keyboard');
    if (this.dark) {
      body?.style.setProperty('background-color', 'var(--bg-color-dark)');
      body?.style.setProperty('color', 'var(--font-color-dark)');
      if (buttons) {
        buttons.forEach(btn => {
          btn.style.setProperty('background-color', 'var(--bg-color-key-dark)');
          if (!this.types.includes((btn.textContent) ? btn.textContent : '')) {
            btn.style.setProperty('color', 'var(--font-color-dark)');
          }
        });
      }
      keyboard?.style.setProperty('background-color', 'var(--bg-color-keyboard-dark)');
    } else {
      body?.style.setProperty('background-color', 'var(--bg-color-light)');
      body?.style.setProperty('color', 'var(--font-color-light)');
      if (buttons) {
        buttons.forEach(btn => {
          btn.style.setProperty('background-color', 'white');
          if (!this.types.includes((btn.textContent) ? btn.textContent : '')) {
            btn.style.setProperty('color', 'var(--font-color-light)');
          }
        });
      }
      keyboard?.style.setProperty('background-color', 'var(--bg-color-keyboard-light)');
    }
  }
}
