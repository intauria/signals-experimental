import { CdVisualizerDirective, injectCdCounter, SignalComponentFeature } from '@angular-architects/signals-experimental';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent, SidebarComponent } from './core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent, SidebarComponent
  ],
  hostDirectives: [
    CdVisualizerDirective,
    SignalComponentFeature
  ],
  template: `
    <div class="wrapper">
      <div class="sidebar" data-color="white" data-active-color="danger">
        <app-sidebar-cmp />
      </div>

      <div class="main-panel">
        <app-navbar-cmp />

        <div class="content">

          <router-outlet />

        </div>

        <footer></footer>
      </div>
    </div>

    {{ count() }}
  `,
  styles: [`
    .sidebar {
      margin-top: 2px;
      margin-left: 2px;
      height: calc(100% - 4px);
    }

    .wrapper {
      margin-top: 0px;
    }
  `]
})
export class AppComponent {
  count = injectCdCounter({
    viewType: 'Root Component',
    viewDetails: 'App Core Design'
  });
}
