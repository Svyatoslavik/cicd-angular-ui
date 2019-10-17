import { FEATURE_BUILD_STEPS } from './const';
import { IBuildStepsState, buildStepsAdapter } from './build-steps-store.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectBuildByUrl } from '../builds-store';

export const selectBuildStepsState = createFeatureSelector<IBuildStepsState>(FEATURE_BUILD_STEPS);

export const {
  selectEntities: selectStepsEntities,
  selectIds: selectStepsIds,
} = buildStepsAdapter.getSelectors(selectBuildStepsState);

export const selectBuildStepsByUrl = createSelector(selectBuildByUrl, selectStepsEntities,
  (build, stepsMap) => {
  if (build) {
    return build.steps.map(stepName => stepsMap[stepName]).filter(step => step);
  }
  return [];
});

export const selectBuildStepLoading = createSelector(selectBuildStepsState, ({ loading }) => loading);
export const selectBuildStepsError = createSelector(selectBuildStepsState, ({ error }) => error);
