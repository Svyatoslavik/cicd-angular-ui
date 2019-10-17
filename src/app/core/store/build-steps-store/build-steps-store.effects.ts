import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, filter, switchMapTo, first, mapTo } from 'rxjs/operators';
import {
  loadBuildStepsListAction,
  loadBuildStepsListSuccessAction,
  loadBuildStepsListFailedAction,
  loadOneBuildStepAction,
  loadOneBuildStepSuccessAction,
  loadOneBuildStepFailedAction,
  startCIStepsWatchingAction,
  updateBuildStepAction
} from './build-steps-store.actions';
import { IStepStatusMsg } from '../../models/ibuild-update-msg.model';
import { IAppStoreState } from '../store.state';
import { selectStepsIds } from './build-steps-store.selector';
import { BuildLoaderService } from '../../loaders/abstract/build-loader.service';


@Injectable()
export class BuildStepsEffects implements OnInitEffects {
  ciStatusWatching$ = createEffect(() => this.actions$.pipe(
    ofType(startCIStepsWatchingAction),
    switchMapTo(this.buildLoader.messagesStream().pipe(
      filter(({ type }) => 'stepStatus' === type),
      switchMap(({ stepId, status }: IStepStatusMsg) => this.store.select(selectStepsIds).pipe(
        first(),
        filter((idsList: string[]) => idsList.includes(stepId)), // check is step exist in store
        mapTo(updateBuildStepAction({ update: { id: stepId, changes: { status }}}))
      ))))));

  loadOneStep$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(loadOneBuildStepAction),
    switchMap(({ stepId, logsFrom, logsTo }) => this.buildLoader.loadStepWithLogs(stepId, logsFrom, logsTo).pipe(
      map(step => loadOneBuildStepSuccessAction({ step })),
      catchError(error => of(loadOneBuildStepFailedAction({ error }))),
    ))
  ));

  loadStepsList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(loadBuildStepsListAction),
    switchMap(({ buildId }) => this.buildLoader.loadBuildStepsList(buildId).pipe(
      map(stepsList => loadBuildStepsListSuccessAction({ stepsList })),
      catchError(error => of(loadBuildStepsListFailedAction({ error }))),
    ))
  ));


  constructor(
    private readonly store: Store<IAppStoreState>,
    private readonly actions$: Actions,
    private readonly buildLoader: BuildLoaderService) {}

  ngrxOnInitEffects(): Action {
    return startCIStepsWatchingAction();
  }
}
