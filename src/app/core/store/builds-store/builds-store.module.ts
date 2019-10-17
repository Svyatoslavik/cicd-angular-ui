import { NgModule } from '@angular/core';
import { FEATURE_BUILDS } from './const';
import { buildsReducer } from './builds-store.reducer';
import { StoreModule } from '@ngrx/store';
import { BuildsEffects } from './builds-store.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FEATURE_BUILDS, buildsReducer),
    EffectsModule.forFeature([BuildsEffects]),

  ]
})
export class BuildsStoreModule { }
