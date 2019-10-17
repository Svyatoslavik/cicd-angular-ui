import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlockuiLoadingModule } from '../../components/blockui-loading/blockui-loading.module';



@NgModule({
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule,
    AngularSvgIconModule,
    BlockuiLoadingModule,
  ]
})
export class MainLayoutModule { }
