import { AbstractCustomChangeDetectionStrategy, ChangeDetectionMode, CustomChangeDetectionMode, CustomChangeDetectionHook, CustomChangeDetectionStrategyConfig, T_HOST } from "@angular-architects/signals-experimental/core-hook";
import { Injectable, InjectionToken, NgZone, ProviderToken, inject } from "@angular/core";
import { SignalComponentRegistry } from "../signal-component/signal-component-registry";


declare const Zone: any;

export const CustomChangeDetectionStrategy = CustomChangeDetectionHook.CustomChangeDetectionStrategy as any as ProviderToken<AbstractCustomChangeDetectionStrategy>;

export const CUSTOM_CHANGE_DETECTION_MODE = new InjectionToken<CustomChangeDetectionMode>(
  'CUSTOM_CHANGE_DETECTION_MODE', {
    providedIn: 'root',
    factory: () => CustomChangeDetectionMode.Zone
  }
);

@Injectable()
export class SignalChangeDetectionStrategy implements AbstractCustomChangeDetectionStrategy {
  EffectManager: unknown;

  private updateConfig(config: CustomChangeDetectionStrategyConfig<unknown>): CustomChangeDetectionStrategyConfig<unknown> {
    config.changeDetectionMode = config.injector?.get(
      CUSTOM_CHANGE_DETECTION_MODE, CustomChangeDetectionMode.Zone, { optional: true }
    ) || CustomChangeDetectionMode.Zone;
    config.isSignalComponent = config.injector?.get(SignalComponentRegistry).get(
      config.hostComponentLView[T_HOST].index
    ) || false;
    this.EffectManager = config.EffectManager;

    return config;
  }

  onSetLView(config: CustomChangeDetectionStrategyConfig<unknown>) {
    !this.isZoneOnlyMode(config) && this.updateConfig(config).detachHostView();
  }

  onConsumerDependencyMayHaveChanged(
    providedConfig: CustomChangeDetectionStrategyConfig<unknown>,
    defaultLogic: () => void
  ): void {
    const config = this.updateConfig(providedConfig);
    if (
      typeof Zone === 'undefined' ||
      (
        !this.isZoneOnlyMode(config) &&
        config.isSignalComponent
      )
    ) {
      config.markViewForRefresh(config.lView);
      this.noTriggerMicrotask(config, () => {
        if (this.shouldUpdate(config)) {
          config.reattachHostView();
          config.detectChangesInView(config.lView, ChangeDetectionMode.Targeted);
          config.detachHostView();
        }
      });
      return;
    } else if (!this.isZoneOnlyMode(config)) {
      config.reattachHostView();
    }

    defaultLogic();
  }

  private isZoneOnlyMode(config: CustomChangeDetectionStrategyConfig<unknown>): boolean {
    return config.changeDetectionMode == CustomChangeDetectionMode.Zone;
  }

  private noTriggerMicrotask(config: CustomChangeDetectionStrategyConfig<unknown>, fn: () => void) {
    const asyncFn = () => queueMicrotask(fn);
    config.injector?.get(NgZone, null, { optional: true })
      ?.runOutsideAngular(asyncFn) || asyncFn();
  }

  private shouldUpdate(config: CustomChangeDetectionStrategyConfig<unknown>): boolean {
    return ![...config.reactiveLViewConsumer.producers.entries()]
      .reduce((prevSameVersion, [, edge]) => {
        const hasNewVersion = edge.producerNode.deref().producerPollStatus(
          edge.seenValueVersion
        );
        return prevSameVersion && !hasNewVersion;
      }, true);
  }
}

@Injectable()
export class NoopChangeDetectionStrategy implements AbstractCustomChangeDetectionStrategy {
  EffectManager = null;
  onSetLView(): void {}
  onConsumerDependencyMayHaveChanged(): void {}
}
