import { CustomChangeDetectionMode, provideChangeDetectionStrategy } from '@angular-architects/signals-experimental';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';


export const appConfig = () => ({
  providers: [
    provideChangeDetectionStrategy(),
    provideHttpClient(),
    provideRouter(APP_ROUTES,
      withComponentInputBinding()
    ),
    provideStore(),
    provideEffects(),
    isDevMode() ? provideStoreDevtools() : []
  ]
});
