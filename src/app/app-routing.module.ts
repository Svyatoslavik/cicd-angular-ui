import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './view/pages/dashboard/dashboard/dashboard.component';
import { BuildsListComponent } from './view/pages/builds/builds-list/builds-list.component';
import { BuildDetailsComponent } from './view/pages/builds/build-details/build-details.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'builds', children: [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    { path: 'list', component: BuildsListComponent },
    { path: 'details/:buildId', component: BuildDetailsComponent },
  ] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
