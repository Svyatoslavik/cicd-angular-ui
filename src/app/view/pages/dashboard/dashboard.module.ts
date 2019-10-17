import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutModule } from '../../layouts/main-layout/main-layout.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MainLayoutModule,
    RouterModule
  ]
})
export class DashboardModule { }
