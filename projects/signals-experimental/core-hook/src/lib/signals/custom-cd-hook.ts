import { CONTEXT, FLAGS, INJECTOR, LView, PARENT, TNodeType, T_HOST } from "./angular-types";
import { AbstractCustomChangeDetectionStrategy, CustomChangeDetectionHookConfig, CustomChangeDetectionStrategyConfig } from "./custom-cd-mode";


export class CustomChangeDetectionHook {
  static CustomChangeDetectionStrategy = class {};
  private lView?: LView;
  private cdStrategy?: AbstractCustomChangeDetectionStrategy;
  config?: CustomChangeDetectionStrategyConfig<unknown>;

  constructor(defineInjectable: (...args: unknown[]) => void, private EffectManager: any) {
    Object.defineProperty(CustomChangeDetectionHook.CustomChangeDetectionStrategy, 'ɵprov', {
      enumerable: false,
      writable: true
    });
    (CustomChangeDetectionHook as any).CustomChangeDetectionStrategy['ɵprov'] = defineInjectable({
      token: CustomChangeDetectionHook.CustomChangeDetectionStrategy,
      providedIn: 'root',
      factory: () => ({
        onSetLView: () => undefined,
        onConsumerDependencyMayHaveChanged: () => undefined
      })
    });
  }

  onSetLView(config: CustomChangeDetectionHookConfig): void {
    this.lView = config.reactiveLViewConsumer._lView;
    const injector = this.lView![INJECTOR];
    this.cdStrategy = injector?.get(CustomChangeDetectionHook.CustomChangeDetectionStrategy);

    this.safeRun(() => {
      const hostComponentLView = this.getHostLView(this.lView!);
      const hostComponent = this.getHostComponent(hostComponentLView);

      this.config = {
        ...config,
        lView: this.lView!,
        hostComponentLView,
        hostComponent,
        injector,
        EffectManager: this.EffectManager,
        detachHostView: () => this.detachHostView(hostComponentLView),
        reattachHostView: () => this.reattachHostView(hostComponentLView)
      };

      this.cdStrategy?.onSetLView(this.config);
    });
  }

  onConsumerDependencyMayHaveChanged(defaultLogic: () => void) {
    this.safeRun(() => {
      this.cdStrategy?.onConsumerDependencyMayHaveChanged(this.config!, defaultLogic);
    });
  }

  private safeRun(logic: () => void) {
    if (!this.lView) {
      throw new Error('LView is not defined.');
    }
    if (!this.cdStrategy) {
      throw new Error('CustomChangeDetectionStrategy is not found in the Angular Dependency Injection tree.');
    }
    logic();
  }

  private getHostComponent<T>(hostComponentLView: LView): T {
    return hostComponentLView[CONTEXT];
  }

  private getHostLView(lView: LView): LView {
    return lView[T_HOST].type === TNodeType.Element ?
      lView :
      this.getHostLView(lView[PARENT][PARENT]);
  }

  private detachHostView(hostComponentLView: LView) {
    hostComponentLView[FLAGS] &= ~128;
  }

  private reattachHostView(hostComponentLView: LView) {
    hostComponentLView[FLAGS] |= 128;
  }
}
