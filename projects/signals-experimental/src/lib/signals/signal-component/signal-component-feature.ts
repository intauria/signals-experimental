import { Directive, Injector, inject } from "@angular/core";
import { SignalComponentRegistry } from "./signal-component-registry";


@Directive({
  selector: 'signal-component-feature',
  standalone: true
})
export class SignalComponentFeature {
  private injector = (inject(Injector) as any as { _tNode: { index: number }});
  private registry = inject(SignalComponentRegistry);

  constructor() {
    const idx = this.injector._tNode.index;
    this.registry.set(idx);
  }
}
