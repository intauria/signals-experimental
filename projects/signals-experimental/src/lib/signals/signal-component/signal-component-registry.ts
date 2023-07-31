import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SignalComponentRegistry {
  private state: Record<number, boolean> = {};

  get(id: number): boolean {
    return !!this.state[id];
  }

  set(id: number): void {
    this.state[id] = true;
  }
}
