import { EnvironmentProviders, computed, inject, makeEnvironmentProviders } from "@angular/core";
import { Actions, createEffect, ofType, provideEffects } from "@ngrx/effects";
import { Store, createActionGroup, createFeature, createReducer, createSelector, emptyProps, on, props, provideState } from "@ngrx/store";
import { Observable, filter, map, switchMap } from "rxjs";
import { FlightService } from "../flight/logic/data-access/flight.service";
import { Flight, initialFlight } from "../flight/logic/model/flight";
import { routerFeature } from "./router.state";

/**
 * Actions
 */

export const bookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Flights load': props<{ from: string, to: string }>(),
    'Flights loaded': props<{ flights: Flight[] }>(),
    'Flight update': props<{ flight: Flight }>(),
    'Flight save': props<{ flight: Flight }>(),
    'Flight clear': emptyProps(),
    'Ticket Id add': props<{ id: number }>()
  }
});

/**
 * Model
 */

export interface BookingState {
  flights: Flight[];
  basket: unknown;
  user: { passengerId: number; username: string };
  tickets: Record<number, { passengerId: number; flightId: number }>;
  ticketIds: number[];
}

export const initialState: BookingState = {
  flights: [],
  basket: {},
  user: { passengerId: 1, username: 'jane.doe' },
  tickets: {
    1: { passengerId: 1, flightId: 1237 },
    2: { passengerId: 1, flightId: 1238 }
  },
  ticketIds: [2, 1]
};

/**
 * Feature
 *  - Reducer
 *  - Selectors
 */

export const bookingFeature = createFeature({
  name: 'booking',
  reducer: createReducer(
    initialState,

    on(bookingActions.flightsLoaded, (state, action) => {
      return {
        ...state,
        flights: action.flights
      };
    }),

    on(bookingActions.ticketIdAdd, (state, action) => ({
      ...state,
      ticketIds: [
        ...state.ticketIds,
        action.id
      ]
    }))
  ),
  extraSelectors: ({
    selectUser,
    selectFlights,
    selectTickets
  }) => ({
    selectActiveUserFlights: createSelector(
      // Selectors
      selectUser,
      selectFlights,
      selectTickets,
      // Projector
      (user, flights, tickets) => {
        const activeUserPassengerId = user.passengerId;
        const activeUserFlightIds = Object.values(tickets)
          .filter(ticket => ticket.passengerId === activeUserPassengerId)
          .map(ticket => ticket.flightId);

        console.log('projector runs');
        return flights
          .filter(flight => activeUserFlightIds.includes(flight.id));
      }
    ),
    selectActiveFlight: createSelector(
      selectFlights,
      routerFeature.selectRouteParams,
      (flights, params) =>
        flights.find(f => f.id === +params['id'])
    )
  })
});

/**
 * Effects
 */

export const loadFlights$ = createEffect((
  actions = inject(Actions),
  flightService = inject(FlightService)
) => actions.pipe(
  ofType(bookingActions.flightsLoad),
  switchMap(action => flightService.find(action.from, action.to)),
  map(flights => bookingActions.flightsLoaded({ flights }))
), { functional: true });

export const saveFlight$ = createEffect((
  actions = inject(Actions),
  flightService = inject(FlightService)
) => actions.pipe(
  ofType(bookingActions.flightSave),
  switchMap(action => flightService.save(action.flight)),
), { functional: true, dispatch: false });

/**
 * Provider
 */

const bookingEffects = { loadFlights$, saveFlight$ };

export function provideBookingFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(bookingFeature),
    provideEffects(bookingEffects)
  ]);
}

/**
 * Facade
 */

export function injectBookingFeature() {
  const store = inject(Store);
  const activeFlight = store.selectSignal(bookingFeature.selectActiveFlight);

  return {
    flights: store.selectSignal(bookingFeature.selectFlights),
    flights$: store.select(bookingFeature.selectFlights),
    activeFlight: computed(
      () => activeFlight() || initialFlight
    ),
    search: (from: string, to: string) => store.dispatch(
      bookingActions.flightsLoad({ from, to })
    ),
    save: (flight: Flight) => store.dispatch(
      bookingActions.flightSave({ flight })
    )
  };
}
