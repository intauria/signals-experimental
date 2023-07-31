import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flights: Flight[] = [];
  baseUrl = `https://demo.angulararchitects.io/api`;
  #http = inject(HttpClient);

  load(from: string, to: string, urgent: boolean): void {
    this.find(from, to, urgent).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (err) => console.error('Error loading flights', err),
    });
  }

  find(
    from: string,
    to: string,
    urgent: boolean = false
  ): Observable<Flight[]> {
    let url = [this.baseUrl, 'flight'].join('/');

    if (urgent) {
      url = [this.baseUrl, 'error?code=403'].join('/');
    }

    const params = new HttpParams().set('from', from).set('to', to);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.#http.get<Flight[]>(url, { params, headers });
  }

  findById(id: number): Observable<Flight> {
    const url = [this.baseUrl, 'flight'].join('/');
    const params = new HttpParams().set('id', id);

    return this.#http.get<Flight>(url, { params });
  }

  save(flight: Flight): Observable<Flight> {
    const url = [this.baseUrl, 'flight'].join('/');

    return this.#http.post<Flight>(url, flight);
  }

  delay() {
    const ONE_MINUTE = 1000 * 60;

    const oldFlights = this.flights;
    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);

    // Mutable
    oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    oldFlight.date = oldDate.toISOString();
  }
}
