import { CdVisualizerDirective, injectCdCounter, SignalComponentFeature } from '@angular-architects/signals-experimental';
import { DatePipe, JsonPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { injectBookingFeature } from '../../../+state/booking.state';
import { CardComponent } from '../../ui/card.component';
import { CounterComponent } from '../../ui/counter.component';
import { Flight } from './../../logic/model/flight';


@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    NgIf, NgFor, DatePipe, JsonPipe, NgTemplateOutlet,
    RouterLink,
    FormsModule,
    CardComponent,
    CounterComponent,
    CdVisualizerDirective
  ],
  hostDirectives: [
    CdVisualizerDirective,
    SignalComponentFeature
  ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  count = injectCdCounter({
    viewType: 'Smart Component',
    viewDetails: 'Flight Search'
  });

  from = signal('Paris');
  to = signal('London');
  additionalInfo = signal('');
  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });
  bookingFeature = injectBookingFeature();
  logMessage = signal('Initial Effect log.');

  flightInfo = computed(() => [
    `Flight from ${ this.from() } to ${ this.to() }.`,
    this.additionalInfo()
  ]);

  constructor() {
    effect(
      () => console.log('%c' + this.logMessage(), 'color: green')
    );
  }

  flightTrackBy(index: number, flight: Flight) {
    return flight.id;
  }

  updateBasket(id: number, selected: boolean): void {
    this.basket.mutate(
      basket => { basket[id] = selected; }
    );
  }

  changeLogMessage() {
    this.logMessage.set('Effect w/ Signal w/o view binding executes correctly.');
  }
}
