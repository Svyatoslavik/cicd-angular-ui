import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './view/pages/dashboard/dashboard.module';
import { BuildsModule } from './view/pages/builds/builds.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './core/store/store.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BuildLoaderMock } from 'src/simulator/build-loader-mock.service';
import { BuildLoaderService } from './core/loaders/abstract/build-loader.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    DashboardModule,
    BuildsModule,
    AngularSvgIconModule,
    HttpClientModule,
    AppStoreModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: BuildLoaderService, useClass: BuildLoaderMock }],
  bootstrap: [AppComponent]
})
export class AppModule { }
