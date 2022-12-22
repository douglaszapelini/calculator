import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  linkImage: string = "https://img.icons8.com/ios/50/FFFFFF/jake.png";
  @Input() dark: any;

  ngOnInit(): void {
    if (this.dark) {
      this.linkImage = "https://img.icons8.com/ios/50/FFFFFF/jake.png";
    } else {
      this.linkImage = "https://img.icons8.com/ios/50/000000/jake.png";
    }
  }

  ngOnChanges() {
    if (this.dark) {
      this.linkImage = "https://img.icons8.com/ios/50/FFFFFF/jake.png";
    } else {
      this.linkImage = "https://img.icons8.com/ios/50/000000/jake.png";
    }
  }
}
