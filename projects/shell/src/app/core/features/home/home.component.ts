import { Component, Input, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
    <div class="card-header">
        <h2 class="card-title">Angular Signals Change Detection</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Signals - The new reactive primitive.</li>
          <li>
            Demo of an experimental Signals Change Detection.
            <ul>
              <li>Press the <b><i>Signals</i></b> button to switch from zone-based to Signals Change Detection.</li>
            </ul>
          </li>
          <li>Uses a slightly modified <code>@angular/core</code> package.</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {
  private router = inject(Router);
  @Input() redirect = '';

  /* ngOnInit() {
    this.redirect && this.router.navigate(['/' + this.redirect]);
  } */
}
