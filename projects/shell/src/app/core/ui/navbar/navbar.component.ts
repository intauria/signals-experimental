import { SignalComponentFeature } from '@angular-architects/signals-experimental';
import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-navbar-cmp',
  standalone: true,
  templateUrl: 'navbar.component.html',
  imports: [NgIf],
  hostDirectives: [
    SignalComponentFeature
  ],
  styles: [`
    .navbar {
      position: fixed;
      margin: 2px;
      width: calc(100% - 4px);
      background-color: #f4f3ef !important;
    }
  `]
})
export class NavbarComponent {
  sidebarVisible = signal(false);

  sidebarToggle() {
    var body = document.getElementsByTagName('body')[0];

    if (this.sidebarVisible() === false) {
      body.classList.add('nav-open');
      this.sidebarVisible.set(true);
    } else {
      this.sidebarVisible.set(false);
      body.classList.remove('nav-open');
    }
  }
}
