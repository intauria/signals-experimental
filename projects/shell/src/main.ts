import { bootstrapWithChangeDetectionStrategy, CustomChangeDetectionMode } from '@angular-architects/signals-experimental';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapWithChangeDetectionStrategy(
  () => bootstrapApplication(AppComponent, appConfig()),
  'app-root',
  CustomChangeDetectionMode.Zone
);
