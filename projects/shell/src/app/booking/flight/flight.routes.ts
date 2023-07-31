import { Routes } from "@angular/router";
import { EditComponent } from "./features/edit/edit.component";
import { SearchComponent } from './features/search/search.component';


export const FLIGHT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent
      }
    ]
  }

];

export default FLIGHT_ROUTES;
