import { CdVisualizerDirective, injectCdCounter, SignalComponentFeature } from '@angular-architects/signals-experimental';
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    FormsModule
  ],
  hostDirectives: [
    CdVisualizerDirective,
    SignalComponentFeature
  ],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Counter</h2>
      </div>

      <div class="card-body">
        <div class="from-group">
            <label>Current value:</label>
            <input [ngModel]="counter()" type="number" class="form-control" style="max-width: 200px" disabled>
            <button class="btn btn-info btn-sm" (click)="decrease()">-</button>
            <button class="btn btn-success btn-sm" (click)="increase()">+</button>
        </div>
      </div>
    </div>

    {{ count() }}
  `
})
export class CounterComponent {
  count = injectCdCounter({
    viewType: 'UI Component',
    viewDetails: 'Counter'
  });

  counter = signal(250);

  increase() {
    this.counter.update(c => ++c);
  }

  decrease() {
    this.counter.update(c => --c);
  }
}
