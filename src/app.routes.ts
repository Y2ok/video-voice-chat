import { Routes, RouterModule } from '@angular/router';

/* Page Imports */
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});