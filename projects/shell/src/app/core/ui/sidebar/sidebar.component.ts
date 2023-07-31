import { CustomChangeDetectionMode, rebootstrapWithChangeDetectionStrategy } from '@angular-architects/signals-experimental';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-sidebar-cmp',
  standalone: true,
  templateUrl: 'sidebar.component.html',
  imports: [
    NgFor,
    RouterLinkWithHref, RouterLinkActive
  ],
  styles: [`
    .sidebar-wrapper {
      margin-top: 55px;
      margin-bottom: 2px;
    }
  `]
})
export class SidebarComponent {
  setChangeDetection = {
    Zone: () => rebootstrapWithChangeDetectionStrategy(CustomChangeDetectionMode.Zone),
    Signals: () => rebootstrapWithChangeDetectionStrategy(CustomChangeDetectionMode.Signals)
  };
}
