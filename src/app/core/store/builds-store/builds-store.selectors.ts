import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBuildsState, buildsAdapter } from './builds-store.state';
import { FEATURE_BUILDS } from './const';
import { selectRouteParam } from '../router-store/router-store.selectors';

export const selectBuildsState = createFeatureSelector<IBuildsState>(FEATURE_BUILDS);

const {
  selectAll,
  selectEntities,
} = buildsAdapter.getSelectors(selectBuildsState);

export const selectBuildsList = createSelector(
  selectAll,
  buildsList => buildsList.sort(({ id: b1Id}, { id: b2Id }) => b2Id - b1Id));

export const selectBuildsLoading = createSelector(
  selectBuildsState,
  ({ loading }) => loading);

export const selectBuildError = createSelector(selectBuildsState, ({ error }) => error);

export const selectBuildIdByUrl = createSelector(selectRouteParam('buildId'), buildId => buildId && parseInt(buildId, 10));
export const selectBuildByUrl = createSelector(
  selectEntities,
  selectBuildIdByUrl,
  (buildsMap, buildId) => buildsMap[buildId]);

// export const selectBuildStepsByUrl = createSelector(selectBuildByUrl, build => {
//   if (build) {
//     return build.steps.map(stepName => build.stepsMap[stepName]);
//   }
//   return [];
// });
