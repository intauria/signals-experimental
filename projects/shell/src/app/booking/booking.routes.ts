import { Routes } from "@angular/router";
import { provideBookingFeature } from "./+state/booking.state";
import { provideRouterFeature } from "./+state/router.state";

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        loadChildren: () => import('./flight')
      },
      {
        path: 'passenger',
        loadChildren: () => import('./passenger')
      }
    ],
    providers: [
      provideBookingFeature(),
      provideRouterFeature()
    ]
  }
];

export default BOOKING_ROUTES;
