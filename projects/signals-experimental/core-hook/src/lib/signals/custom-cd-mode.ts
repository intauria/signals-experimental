import type { Injector } from "@angular/core";
import { ChangeDetectionMode, LView } from "./angular-types";


export enum CustomChangeDetectionMode {
  Zone,
  Signals
}

export interface CustomChangeDetectionHookConfig {
  reactiveLViewConsumer: any;
  markViewForRefresh: (lView: LView) => void;
  detectChangesInView: (lView: LView, mode: ChangeDetectionMode) => void;
}

export interface CustomChangeDetectionStrategyConfig<T> extends CustomChangeDetectionHookConfig {
  lView: LView;
  hostComponentLView: LView;
  hostComponent: T;
  injector: Injector | null;
  changeDetectionMode?: CustomChangeDetectionMode;
  isSignalComponent?: boolean;
  EffectManager: any;
  detachHostView: () => void;
  reattachHostView: () => void;
}

export abstract class AbstractCustomChangeDetectionStrategy {
  EffectManager: any;
  abstract onSetLView(config: CustomChangeDetectionStrategyConfig<unknown>): void;
  abstract onConsumerDependencyMayHaveChanged(
    config: CustomChangeDetectionStrategyConfig<unknown>,
    defaultLogic: () => void
  ): void;
}
