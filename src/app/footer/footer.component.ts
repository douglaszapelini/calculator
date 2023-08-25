import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  srcDarkIcon: string = '../../assets/wolf-dog-dark.svg';
  srcLightIcon: string = '../../assets/wolf-dog-light.svg';

  linkImage: string = this.srcDarkIcon;
  @Input() dark: any;

  ngOnInit(): void {
    this.changeLogoSrc();
  }

  ngOnChanges() {
    this.changeLogoSrc();
  }

  changeLogoSrc() {
    if (this.dark) {
      this.linkImage = this.srcDarkIcon;
    } else {
      this.linkImage = this.srcLightIcon;
    }
  }
}
