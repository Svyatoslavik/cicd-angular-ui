import { createReducer, on, Action } from '@ngrx/store';
import { IBuildStepsState, initialBuildStepsState, buildStepsAdapter } from './build-steps-store.state';
import {
  updateBuildStepAction,
  loadBuildStepsListAction,
  loadBuildStepsListSuccessAction,
  loadBuildStepsListFailedAction,
  loadOneBuildStepSuccessAction,
  loadOneBuildStepAction,
  loadOneBuildStepFailedAction
} from './build-steps-store.actions';

const reducer = createReducer<IBuildStepsState>(
  initialBuildStepsState,
  on(loadBuildStepsListAction, loadOneBuildStepAction, state => ({
    ...state, loading: true
  })),
  on(loadBuildStepsListSuccessAction, (state, { stepsList }) => buildStepsAdapter.addAll(stepsList, {
    ...state,
    loading: false,
    error: null
  })),
  on(loadBuildStepsListFailedAction, loadOneBuildStepFailedAction, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(loadOneBuildStepSuccessAction, (state, { step }) => buildStepsAdapter.upsertOne(step, {
    ...state,
    loading: false,
  })),
  on(updateBuildStepAction, (state, { update }) => buildStepsAdapter.updateOne(update, state)),
);

export function buildStepsReducer(state: IBuildStepsState, action: Action) {
  return reducer(state, action);
}
