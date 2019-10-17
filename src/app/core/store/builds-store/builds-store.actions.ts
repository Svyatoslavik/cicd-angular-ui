import { createAction, props } from '@ngrx/store';
import { IBuildModel } from '../../models/ibuild.model';
import { TBuildUpdateMsg } from '../../models/ibuild-update-msg.model';
import { Update } from '@ngrx/entity';

// CI Stream
export const startCIBuildsWatchingAction = createAction(
  '[Builds] Start CI Build Watching');

export const startNewBuildAction = createAction(
  '[Builds] Start New Build');

// Load One
export const loadOneBuildAction = createAction(
  '[Builds] Load One', props<{ buildId: number }>());

export const loadOneBuildSuccessAction = createAction(
  '[Builds] Load One Success',
  props<{ build: IBuildModel }> ());

export const loadOneBuildFailedAction = createAction(
  '[Builds] Load One Failed',
  props<{ error: string }>());


// Load list
export const loadBuildsListAction = createAction(
  '[Builds] Load List', props<{ limit: number, offset: number }>());

export const loadBuildsListSuccessAction = createAction(
  '[Builds] Load List Success',
  props<{ buildsList: IBuildModel[] }> ());

export const loadBuildsListFailedAction = createAction(
  '[Builds] Load List Failed',
  props<{ error: string }>());

export const updateBuildAction = createAction(
  '[Builds] Update Build',
  props<{ update: Update<IBuildModel> }>());


