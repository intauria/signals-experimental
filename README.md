# @angular-architects/signals-experimental

[![npm](https://img.shields.io/npm/v/%40angular-architects%2Fsignals-experimental.svg)](https://www.npmjs.com/package/%40angular-architects%2Fsignals-experimental)

[🌐 Hosted Demo](https://www.intauria.com/angular-architects/8ce83a8f-3713-41a1-9e6b-66164f01734e/signal-cd/) \
[🎞️ Video: Zone-based vs. Signal-based Change Detection](https://twitter.com/MikeZks/status/1684277119256231937) \
[❓ Questions: Feel free to use the Q&A section](https://github.com/intauria/signals-experimental/discussions/1)

This is library allows to configure an experimental Angular Change Detection strategy based on Signals.

> ⚠️ It uses a slightly modified version of the `@angular/core` package and is therefore not meant to be used in apps rolled-out for production usage.

- [@angular-architects/signals-experimental](#angular-architectssignals-experimental)
  - [Supported Features](#supported-features)
  - [Getting Started](#getting-started)
  - [Roadmap](#roadmap)
  

![Demo App](https://i.ibb.co/d4tZdnm/demo-app.png)


## Supported Features

- Angular Default Change Detection
- Signal-based Change Detection w/o Zone.js
  - Triggers if Template (`ReactiveLViewConsumer`) is notified by it's Signal Producers and the Value-Version changed.
  - Schedules Effects based on the AnimationFrame.
  - Triggers Change Detection after Routing Events.


## Getting Started

1. Currently, Angular Version `16.1.7` is supported.
2. Install package:
   
    ```bash
    npm install @angular-architects/signals-experimental@ng.16.1.7
    ```

3. Install patched `@angular/core` package:
   
    ```bash
    npm install @angular/core@file:./node_modules/@angular-architects/signals-experimental/.bin/angular-core-patch-16.1.7.tgz
    ```

4. Add a provider to the bootstrap config (`main.ts` or `app.config.ts`):

    ```diff
    +import {
    +  CustomChangeDetectionMode,
    +  provideChangeDetectionStrategy
    +} from '@angular-architects/signals-experimental';
 
     export const appConfig = {
       providers: [
    +    provideChangeDetectionStrategy(
    +      CustomChangeDetectionMode.Signals
    +    )
         // All other providers
       ]
     };
    ```

5. Each Component where the Change Detection shall be triggered through Signals needs to use a Host Directive:

    ```diff
    +import {
    +  SignalComponentFeature
    +} from '@angular-architects/signals-experimental';
     import {
       NgFor, NgIf
     } from '@angular/common';
     import { 
       Component, computed, effect, signal
     } from '@angular/core';
 
     @Component({
       selector: 'app-search',
       standalone: true,
       imports: [
         NgIf, NgFor
       ],
    +  hostDirectives: [
    +    SignalComponentFeature
    +  ],
       templateUrl: './search.component.html'
     })
     export class SearchComponent {
       name = signal('Jane');
     }
    ```

6. That's all - try out this experimental mode and tell us how it works for you. Although the upcoming Angular implementation of Signal Components (could be published with Angular v18) likely will vary, any experiment with your codebase may be helpful to provide useful feedback to the Angular team to improve the final API.


## Roadmap

- Support for further Angular releases.
- Support a hybrid mode with Zone-based and Signal-based Change Detection w/i one app.
- Schematics to improve the patch version setup.
