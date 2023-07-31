import { NgIf } from '@angular/common';
import { Component, Input, inject, OnInit, numberAttribute } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util/validation/passenger-status.validator';
import { PassengerService } from './../../logic/data-access/passenger.service';

@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  @Input({transform: numberAttribute }) id = 0;
  editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });
  #passengerService = inject(PassengerService);

  ngOnInit() {
    this.editForm.patchValue(
      this.#passengerService.passengers.find(p => p.id === this.id) ||
      this.editForm.value
    );
  }

  save(): void {
    console.log(this.editForm.getRawValue());
  }
}
