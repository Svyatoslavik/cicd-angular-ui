import { NgModule } from '@angular/core';
import { BuildsStoreModule } from './builds-store/builds-store.module';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from './router-store/router-store.module';
import { BuildStepsStoreModule } from './build-steps-store/build-steps-store.module';

@NgModule({
  declarations: [],
  imports: [
    BuildsStoreModule,
    BuildStepsStoreModule,
    RouterStoreModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ]
})
export class AppStoreModule { }
