import { Component, DestroyRef, Injector, effect, inject, runInInjectionContext } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { injectBookingFeature } from '../../../+state/booking.state';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html'
})
export class EditComponent {
  editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });
  #bookingFeature = injectBookingFeature();

  constructor() {
    effect(() =>
      this.editForm.patchValue(
        this.#bookingFeature.activeFlight()
      )
    );
  }

  save(): void {
    console.log(this.editForm.value);
  }
}
