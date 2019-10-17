import { FEATURE_BUILDS, IBuildsState } from './builds-store';
import { FEATURE_ROUTER } from './router-store/const';
import { RouterReducerState } from '@ngrx/router-store';
import { FEATURE_BUILD_STEPS } from './build-steps-store/const';
import { IBuildStepsState } from './build-steps-store/build-steps-store.state';

export interface IAppStoreState {
  [FEATURE_BUILDS]: IBuildsState;
  [FEATURE_BUILD_STEPS]: IBuildStepsState;
  [FEATURE_ROUTER]: RouterReducerState<any>;
}
