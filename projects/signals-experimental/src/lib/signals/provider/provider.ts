import { CustomChangeDetectionMode } from '@angular-architects/signals-experimental/core-hook';
import { ApplicationRef, ENVIRONMENT_INITIALIZER, EnvironmentProviders, Injector, NgZone, inject, makeEnvironmentProviders, ɵNoopNgZone } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from "rxjs";
import { CUSTOM_CHANGE_DETECTION_MODE, CustomChangeDetectionStrategy, NoopChangeDetectionStrategy, SignalChangeDetectionStrategy } from "../custom-change-detection/custom-cd-strategy";
import { getChangeDetectionMode } from '../bootstrap/bootstrap';


export function provideRouterChangeDetectionTrigger(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ENVIRONMENT_INITIALIZER,
    useFactory: (
      router = inject(Router),
      appRef = inject(ApplicationRef)
    ) => () => {
      router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        tap(() => appRef.tick())
      ).subscribe();
    },
    multi: true
  }]);
}

export function provideZonelessEffectScheduling(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ENVIRONMENT_INITIALIZER,
    useFactory: (
      cdStrategy = inject(CustomChangeDetectionStrategy, { optional: true }),
      injector = inject(Injector)
    ) => () => {
      const warnNoEffectScheduling = () => console.warn([
        'Effect Scheduling is not active. No CustomChangeDetectionStrategy or no EffectManager',
        'is provided in the Angular Dependency Injection tree. Or no EffectManager property is',
        'set in the CustomChangeDetectionStrategy'
      ].join(' '));

      requestAnimationFrame(() => {
        if (cdStrategy?.EffectManager) {
          const effectManager = injector.get<any>(cdStrategy.EffectManager, undefined);
          if (effectManager) {
            const scheduleEffects = () => requestAnimationFrame(() => {
              effectManager.flush();
              scheduleEffects();
            });
            scheduleEffects();
          } else {
            warnNoEffectScheduling();
          }
        } else {
          warnNoEffectScheduling();
        }
      });
    },
    multi: true
  }]);
}

export function provideNoopNgZone(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: NgZone,
    useClass: ɵNoopNgZone
  }]);
}

export function provideNoopChangeDetectionStrategy(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: CustomChangeDetectionStrategy,
    useClass: NoopChangeDetectionStrategy
  }]);
}

export function provideSignalChangeDetectionStrategy(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: CustomChangeDetectionStrategy,
    useClass: SignalChangeDetectionStrategy
  }]);
}

export function provideChangeDetectionStrategy(
  mode: CustomChangeDetectionMode = getChangeDetectionMode() ?? CustomChangeDetectionMode.Zone
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: CUSTOM_CHANGE_DETECTION_MODE,
      useValue: mode
    },
    ...([
      CustomChangeDetectionMode.Zone
    ].includes(mode) ? [provideNoopChangeDetectionStrategy()] : []),
    ...([
      CustomChangeDetectionMode.Signals
    ].includes(mode) ? [provideSignalChangeDetectionStrategy()] : []),
    ...([
      CustomChangeDetectionMode.Signals
    ].includes(mode) ? [provideNoopNgZone()] : []),
    ...([
      CustomChangeDetectionMode.Signals,
    ].includes(mode) ? [provideRouterChangeDetectionTrigger()] : []),
    ...([
      CustomChangeDetectionMode.Signals,
    ].includes(mode) ? [provideZonelessEffectScheduling()] : [])
  ]);
}
