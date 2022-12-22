import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dark: boolean = true;
  constructor() { }

  toggleDark() {
    this.dark = !this.dark;

    let body = document.querySelector('body');
    let buttons = document.querySelectorAll('button');
    console.log(buttons);
    if (this.dark) {
      body?.style.setProperty('background-color', 'var(--bg-color-dark)');
      body?.style.setProperty('color', 'var(--font-color-dark)');
      if (buttons) {
        buttons.forEach(btn => {
          btn.style.setProperty('background-color', 'var(--bg-color-dark)');
          btn.style.setProperty('color', 'var(--font-color-dark)');
        });
      }
    } else {
      body?.style.setProperty('background-color', 'var(--bg-color-light)');
      body?.style.setProperty('color', 'var(--font-color-light)');
      if (buttons) {
        buttons.forEach(btn => {
          btn.style.setProperty('background-color', 'white');
          btn.style.setProperty('color', 'var(--font-color-light)');
        });
      }
    }
  }
}
