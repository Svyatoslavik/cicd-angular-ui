import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

import { BuildsListComponent } from './builds-list/builds-list.component';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { MainLayoutModule } from '../../layouts/main-layout/main-layout.module';
import { BuildsListViewComponent } from './builds-list/builds-list-view/builds-list-view.component';
import { ErrorMsgModule } from '../../components/error-msg/error-msg.module';
import { StepsListViewComponent } from './build-details/components/steps-list-view/steps-list-view.component';
import { StepItemComponent } from './build-details/components/steps-list-view/step-item/step-item.component';
import { StepStreamViewComponent } from './build-details/components/steps-list-view/step-item/stream-view/stream-view.component';




@NgModule({
  declarations: [
    BuildsListComponent,
    BuildDetailsComponent,
    BuildsListViewComponent,
    StepsListViewComponent,
    StepItemComponent,
    StepStreamViewComponent,
  ],
  imports: [
    CommonModule,
    MainLayoutModule,
    ClarityModule,
    RouterModule,
    ErrorMsgModule,
  ]
})
export class BuildsModule { }
