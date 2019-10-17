import { createAction, props } from '@ngrx/store';
import { IStep } from '../../models/istep.model';
import { Update } from '@ngrx/entity';

// CI Stream
export const startCIStepsWatchingAction = createAction(
  '[Build Steps] Start CI Build Watching');

export const loadBuildStepsListAction = createAction(
  '[Build Steps] Load Steps List', props<{ buildId: number }>());

export const loadBuildStepsListSuccessAction = createAction(
  '[Build Steps] Load Steps List Success',
  props<{ stepsList: IStep[] }> ());

export const loadBuildStepsListFailedAction = createAction(
  '[Build Steps] Load Steps List Failed',
  props<{ error: string }>());

export const loadOneBuildStepAction = createAction(
  '[Build Steps] Load One Step', props<{ stepId: string, logsFrom: number, logsTo: number }>());

export const loadOneBuildStepSuccessAction = createAction(
  '[Build Steps] Load One Step Success',
  props<{ step: IStep }> ());

export const loadOneBuildStepFailedAction = createAction(
  '[Build Steps] Load One Step Failed',
  props<{ error: string }>());

export const updateBuildStepAction = createAction(
    '[Build Steps] Update Step',
    props<{ update: Update<IStep> }>());

// export const appendLogMsgIntoBuildStepAction = createAction(
//   '[Build Steps] Append Log Msg Into Build Action',
//   props<{ buildId: number, stepName: string, msg: string }>());
