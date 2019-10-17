import { createReducer, on, Action } from '@ngrx/store';

import {
  initialBuildsState,
  IBuildsState,
  buildsAdapter
} from './builds-store.state';

import {
  loadOneBuildAction,
  loadBuildsListAction,
  loadOneBuildSuccessAction,
  loadBuildsListSuccessAction,
  loadOneBuildFailedAction,
  loadBuildsListFailedAction,
  updateBuildAction,
} from './builds-store.actions';

const reducer = createReducer<IBuildsState>(
  initialBuildsState,
  on(loadOneBuildAction,
    loadBuildsListAction,
    state => ({
      ...state,
      loading: true,
      error: null,
    })),
  on(loadOneBuildSuccessAction,
    (state, { build }) => buildsAdapter.upsertOne(build, {
      ...state,
      loaded: true,
      loading: false,
      error: null,
    })),
  on(loadBuildsListSuccessAction,
    (state, { buildsList }) => buildsAdapter.addAll(buildsList, {
      ...state,
      loaded: true,
      loading: false,
      error: null,
    })),
  on(loadOneBuildFailedAction,
    loadBuildsListFailedAction,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  on(updateBuildAction,
    (state, { update }) =>
      buildsAdapter.updateOne(update, state)),
);

export function buildsReducer(state: IBuildsState, action: Action) {
  return reducer(state, action);
}
