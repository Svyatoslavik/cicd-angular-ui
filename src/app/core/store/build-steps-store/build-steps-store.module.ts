import { NgModule } from '@angular/core';
import { buildStepsReducer } from './build-steps-store.reducer';
import { FEATURE_BUILD_STEPS } from './const';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BuildStepsEffects } from './build-steps-store.effects';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FEATURE_BUILD_STEPS, buildStepsReducer),
    EffectsModule.forFeature([BuildStepsEffects]),
  ]
})
export class BuildStepsStoreModule { }
